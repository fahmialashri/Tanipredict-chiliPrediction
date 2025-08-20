let model;
const classNames = [
  "Cercospora",
  "Healthy",
  "Nutrient Deficiency",
  "Powdery Mildew",
]; // Update kelas sesuai dengan model yang ada

const classDescriptions = {
  Cercospora: "Tanaman terserang penyakit Cercospora (bintik daun)",
  Healthy: "Tanaman dalam kondisi sehat",
  "Nutrient Deficiency": "Tanaman mengalami kekurangan nutrisi",
  "Powdery Mildew": "Tanaman terserang jamur tepung (Powdery Mildew)",
};

// Cache elemen
const fileInput = document.getElementById("fileInput");
const previewEl = document.getElementById("preview");
const resultEl = document.getElementById("result");
const loaderEl = document.getElementById("loader");
const dropZone = document.getElementById("dropZone");
const predictBtn = document.getElementById("predictBtn");
const btnText = document.querySelector(".btn-text");
const btnLoading = document.querySelector(".btn-loading");

// Cache elemen kamera
const camera = document.getElementById("camera");
const offscreenCanvas = document.getElementById("offscreen");
const startCamBtn = document.getElementById("startCamBtn");
const stopCamBtn = document.getElementById("stopCamBtn");
const liveStatus = document.getElementById("liveStatus");

// Variabel untuk kamera
let stream = null;
let isLive = false;
let predictionInterval = null;
let lastPredictionTime = 0;
const PREDICTION_COOLDOWN = 2000; // 2 detik cooldown antara prediksi

// Load model saat halaman dibuka
async function loadModel() {
  try {
    model = await tf.loadGraphModel("tfjs_graph_model/model.json");
    console.log("✅ Model berhasil dimuat");
  } catch (err) {
    console.error("❌ Gagal memuat model:", err);
    resultEl.textContent = "Gagal memuat model. Coba muat ulang halaman.";
  }
}
loadModel();

// Helper UI
function setLoading(isLoading) {
  if (isLoading) {
    loaderEl.classList.remove("hidden");
    predictBtn.disabled = true;
    btnText.classList.add("hidden");
    btnLoading.classList.remove("hidden");
  } else {
    loaderEl.classList.add("hidden");
    predictBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnLoading.classList.add("hidden");
  }
}
function showPreview(src) {
  previewEl.src = src;
  previewEl.classList.remove("hidden");
}
function resetResult() {
  resultEl.textContent = "Memproses...";
}
function showError(message) {
  resultEl.textContent = message || "Terjadi kesalahan.";
}

// Handle file
function handleFile(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    showError("File yang dipilih bukan gambar.");
    return;
  }
  const url = URL.createObjectURL(file);
  showPreview(url);
  previewEl.onload = () => {
    URL.revokeObjectURL(url);
    // Tampilkan tombol prediksi setelah gambar dimuat
    predictBtn.classList.remove("hidden");
    resetResult();
  };
}

// Input gambar (klik)
fileInput.addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  handleFile(file);
});

// Drag & drop
if (dropZone) {
  ["dragenter", "dragover"].forEach((evt) =>
    dropZone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add("dragover");
    })
  );
  ["dragleave", "drop"].forEach((evt) =>
    dropZone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove("dragover");
    })
  );
  dropZone.addEventListener("drop", (e) => {
    const file =
      e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    handleFile(file);
  });
  dropZone.addEventListener("click", () => fileInput.click());
  dropZone.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.click();
    }
  });
}

// Event listener untuk tombol prediksi
predictBtn.addEventListener("click", () => {
  if (previewEl.src && !previewEl.classList.contains("hidden")) {
    predict(previewEl);
  }
});

// Fungsi prediksi (update untuk konsistensi dengan kamera)
async function predict(img) {
  if (!model) {
    alert("Model belum siap!");
    return;
  }

  try {
    setLoading(true);
    resetResult();

    // Tambahkan delay kecil untuk animasi loading
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Gunakan tf.tidy agar tensor dibersihkan otomatis
    const scores = await tf.tidy(async () => {
      const tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([150, 150])
        .toFloat()
        .div(255) // Normalisasi
        .expandDims(0);

      const prediction = model.predict(tensor);
      const data = await prediction.data();

      // Debug: lihat skor mentah
      console.log("Skor mentah:", data);
      console.log("Skor per kelas:", {
        Cercospora: data[0],
        Healthy: data[1],
        "Nutrient Deficiency": data[2],
        "Powdery Mildew": data[3],
      });

      return Array.from(data);
    });

    // cari index dengan skor tertinggi
    const maxIndex = scores.indexOf(Math.max(...scores));
    const label = classNames[maxIndex] || "Tidak diketahui";
    const confidence = (scores[maxIndex] * 100).toFixed(2);
    const description = classDescriptions[label] || "";

    resultEl.innerHTML = `
      <div style="text-align: left;">
        <div style="font-size: 20px; margin-bottom: 8px;">📷 Prediksi: ${label}</div>
        <div style="color: var(--muted); margin-bottom: 8px;">Confidence: ${confidence}%</div>
        <div style="font-size: 14px; line-height: 1.4;">${description}</div>
      </div>
    `;
  } catch (err) {
    console.error(err);
    showError("Gagal melakukan prediksi. Coba gambar lain.");
  } finally {
    setLoading(false);
  }
}

// Fungsi untuk memulai kamera
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "environment", // Gunakan kamera belakang jika tersedia
      },
    });

    camera.srcObject = stream;
    camera.classList.remove("hidden");
    startCamBtn.classList.add("hidden");
    stopCamBtn.classList.remove("hidden");
    liveStatus.classList.remove("hidden");

    isLive = true;

    // Mulai prediksi real-time setelah kamera siap
    camera.onloadedmetadata = () => {
      startRealTimePrediction();
    };

    console.log("✅ Kamera berhasil dimulai");
  } catch (err) {
    console.error("❌ Gagal memulai kamera:", err);
    alert("Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.");
  }
}

// Fungsi untuk menghentikan kamera
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }

  camera.classList.add("hidden");
  startCamBtn.classList.remove("hidden");
  stopCamBtn.classList.add("hidden");
  liveStatus.classList.add("hidden");

  isLive = false;

  // Hentikan prediksi real-time
  if (predictionInterval) {
    clearInterval(predictionInterval);
    predictionInterval = null;
  }

  // Reset hasil
  resetResult();

  console.log("🛑 Kamera dihentikan");
}

// Fungsi untuk memulai prediksi real-time
function startRealTimePrediction() {
  if (predictionInterval) {
    clearInterval(predictionInterval);
  }

  // Jalankan prediksi setiap 3 detik
  predictionInterval = setInterval(() => {
    if (isLive && camera.videoWidth > 0) {
      performRealTimePrediction();
    }
  }, 3000);
}

// Fungsi untuk melakukan prediksi real-time
async function performRealTimePrediction() {
  const now = Date.now();

  // Cek cooldown untuk menghindari terlalu banyak prediksi
  if (now - lastPredictionTime < PREDICTION_COOLDOWN) {
    return;
  }

  if (!model || !isLive) return;

  try {
    // Gunakan canvas untuk capture frame dari video
    const ctx = offscreenCanvas.getContext("2d");
    offscreenCanvas.width = camera.videoWidth;
    offscreenCanvas.height = camera.videoHeight;

    // Gambar frame video ke canvas
    ctx.drawImage(camera, 0, 0, offscreenCanvas.width, offscreenCanvas.height);

    // Lakukan prediksi
    const scores = await tf.tidy(async () => {
      const tensor = tf.browser
        .fromPixels(offscreenCanvas)
        .resizeNearestNeighbor([150, 150])
        .toFloat()
        .expandDims(0);

      const prediction = model.predict(tensor);
      const data = await prediction.data();
      return Array.from(data);
    });

    // Update hasil prediksi
    const maxIndex = scores.indexOf(Math.max(...scores));
    const label = classNames[maxIndex] || "Tidak diketahui";
    const confidence = (scores[maxIndex] * 100).toFixed(2);
    const description = classDescriptions[label] || "";

    resultEl.innerHTML = `
      <div style="text-align: left;">
        <div style="font-size: 20px; margin-bottom: 8px;">📷 Prediksi Real-time: ${label}</div>
        <div style="color: var(--muted); margin-bottom: 8px;">Confidence: ${confidence}%</div>
        <div style="font-size: 14px; line-height: 1.4;">${description}</div>
        <div style="margin-top: 8px; font-size: 12px; color: var(--accent);">
          📷 Analisis real-time aktif - hasil diperbarui setiap 3 detik
        </div>
      </div>
    `;

    lastPredictionTime = now;
  } catch (err) {
    console.error("❌ Gagal prediksi real-time:", err);
    // Jangan tampilkan error untuk prediksi real-time agar tidak mengganggu
  }
}

// Event listeners untuk kamera
startCamBtn.addEventListener("click", startCamera);
stopCamBtn.addEventListener("click", stopCamera);

// Cleanup saat halaman ditutup
window.addEventListener("beforeunload", () => {
  if (isLive) {
    stopCamera();
  }
});
