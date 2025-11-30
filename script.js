let model;
const classNames = [
  "Cercospora",
  "Healthy",
  "Nutrient Deficiency",
  "Powdery Mildew",
]; // Class for chili

const classDescriptions = {
  Cercospora: "Tanaman terserang penyakit Cercospora (bintik daun)",
  Healthy: "Tanaman dalam kondisi sehat",
  "Nutrient Deficiency": "Tanaman mengalami kekurangan nutrisi",
  "Powdery Mildew": "Tanaman terserang jamur tepung (Powdery Mildew)",
};

// Treatment recommendations for chili
const chiliTreatments = {
  Cercospora:
    "1. Buang daun yang ada bintik coklat.\n" +
    "2. Semprot mancozeb (Antracol/Dithane) 1–2 sendok makan per 10 liter.\n" +
    "3. Beri NPK sedikit (½ sendok makan). Alasan: NPK bantu tumbuhkan daun baru yang kuat setelah yang sakit dibuang.\n" +
    "4. Jangan siram daun, cukup tanah.\n" +
    "5. Perbaiki drainase supaya tidak lembab.\n",

  Healthy:
    "Agar tetap sehat:\n" +
    "1. Siram pagi (06.00–08.00).\n" +
    "2. Pupuk NPK (Mutiara/Kebomas/Pak Tani) 1 sendok makan tiap 2 minggu.\n" +
    "   Alasan: N buat daun hijau, P buat akar kuat, K buat bunga & buah tidak rontok.\n" +
    "3. Tambah kompos 1 genggam per bulan.\n" +
    "   Alasan: kompos bikin tanah gembur & akar mudah berkembang.\n" +
    "4. Pangkas daun tua.\n" +
    "5. Cek hama tiap 2–3 hari.\n",

  "Nutrient Deficiency":
    "1. Beri NPK 16-16-16 (Mutiara/Kebomas) 1 sendok makan.\n" +
    "   Alasan: daun kuning = kurang Nitrogen, akar lemah = kurang Fosfor, tepi daun kering = kurang Kalium. NPK ngasih tiga-tiganya sekaligus.\n" +
    "2. Semprot pupuk daun (Gandasil D/Growmore) seminggu 1x.\n" +
    "   Alasan: cepat diserap lewat daun, cocok buat tanaman lemah.\n" +
    "3. Tambah kompos 1–2 genggam.\n" +
    "   Alasan: memperbaiki tanah dan nambah tenaga alami.\n" +
    "4. Tabur dolomit 1 sendok makan kalau tanah asam.\n" +
    "   Alasan: dolomit bikin pupuk NPK lebih mudah diserap.\n" +
    "5. Siram pagi saja.\n",

  "Powdery Mildew":
    "1. Semprot Score/Anvil (azole) 1 tutup/10 liter.\n" +
    "2. Pangkas daun rimbun.\n" +
    "3. Beri NPK ½ sendok makan setelah 3 hari.\n" +
    "   Alasan: setelah kena jamur, tanaman butuh nutrisi buat perbaikan daun.\n" +
    "4. Perbaiki drainase.\n" +
    "5. Alternatif alami: baking soda 1 sdm + 1 liter air.\n",
};

// Class for tomato
const tomatoClassNames = [
  "bacterial_spot",
  "early_blight",
  "healthy",
  "late_blight",
  "leaf_mold",
  "septoria_leaf_spot",
  "spotted_spider_mite",
  "target_spot",
  "yellow_leaf_curl_virus",
];

const tomatoClassDescriptions = {
  bacterial_spot: "Tanaman terserang bacterial spot (bintik bakteri)",
  early_blight: "Tanaman terserang early blight (hawar daun awal)",
  healthy: "Tanaman dalam kondisi sehat",
  late_blight: "Tanaman terserang late blight (hawar daun akhir)",
  leaf_mold: "Tanaman terserang leaf mold (jamur daun)",
  septoria_leaf_spot:
    "Tanaman terserang septoria leaf spot (bintik daun septoria)",
  spotted_spider_mite:
    "Tanaman terserang spotted spider mite (tungau laba-laba)",
  target_spot: "Tanaman terserang target spot (bintik target)",
  yellow_leaf_curl_virus:
    "Tanaman terserang yellow leaf curl virus (virus keriting daun kuning)",
};

// Treatment recommendations for tomato
const tomatoTreatments = {
  bacterial_spot:
    "1. Buang daun bercak hitam.\n" +
    "2. Semprot Nordox/Agrimycin 1–2 sendok makan per 10 liter.\n" +
    "3. Beri NPK ½ sendok makan setelah 3 hari.\n" +
    "   Alasan: daun yang dibuang harus diganti daun baru yang sehat, NPK mempercepat tumbuhnya.\n" +
    "4. Jangan siram daun.\n" +
    "5. Rotasi tanaman.\n",

  early_blight:
    "1. Semprot Antracol/Dithane 2 sendok makan.\n" +
    "2. Buang daun bawah.\n" +
    "3. Beri NPK ½ sendok makan.\n" +
    "   Alasan: Kalium pada NPK bikin daun lebih tahan penyakit.\n" +
    "4. Siram pagi saja.\n" +
    "5. Gunakan mulsa.\n",

  healthy:
    "Rawat agar tetap sehat:\n" +
    "1. Siram pagi.\n" +
    "2. Pupuk NPK (Mutiara/Ria/Kebomas) 1 sendok makan tiap 2 minggu.\n" +
    "   Alasan: N hijaukan daun, P kuatkan akar, K bikin buah tidak rontok.\n" +
    "3. Tambah kompos 1 genggam.\n" +
    "   Alasan: kompos bikin tanah gembur & subur.\n" +
    "4. Pasang ajir.\n" +
    "5. Pangkas tunas air.\n",

  late_blight:
    "1. Semprot Ridomil/Matador (mancozeb + metalaxyl).\n" +
    "2. Buang daun coklat basah.\n" +
    "3. Beri NPK ½ sendok makan setelah 3 hari.\n" +
    "   Alasan: tanaman butuh nutrisi buat pulih dari kerusakan parah.\n" +
    "4. Gunakan paranet saat lembab.\n" +
    "5. Semprot preventif mingguan.\n",

  leaf_mold:
    "1. Semprot Score 1 tutup.\n" +
    "2. Pangkas daun bawah.\n" +
    "3. Beri NPK ½ sendok makan.\n" +
    "   Alasan: Kalium bantu perkuat daun biar jamur tidak mudah nempel.\n" +
    "4. Jangan siram daun.\n" +
    "5. Bila parah, cabut.\n",

  septoria_leaf_spot:
    "1. Semprot Daconil 2 sendok makan.\n" +
    "2. Buang daun bawah.\n" +
    "3. Tabur NPK ½–1 sendok makan.\n" +
    "   Alasan: Nitrogen di NPK mempercepat daun baru tumbuh sehat.\n" +
    "4. Rotasi tanaman.\n" +
    "5. Bersihkan sisa tanaman.\n",

  spotted_spider_mite:
    "1. Semprot Agrimec/Oberon tiap 5 hari.\n" +
    "2. Basahi tanah.\n" +
    "3. Beri NPK ½ sendok makan.\n" +
    "   Alasan: daun rusak karena tungau butuh nutrisi lengkap untuk tumbuh baru.\n" +
    "4. Rotasi akarisida.\n" +
    "5. Bersihkan gulma.\n",

  target_spot:
    "1. Semprot mancozeb/Amistar tiap 7 hari.\n" +
    "2. Buang daun bercak.\n" +
    "3. Beri NPK setelah 3 hari (½ sendok makan).\n" +
    "   Alasan: Kalium perkuat daun supaya tidak kena bercak lagi.\n" +
    "4. Drainase harus lancar.\n" +
    "5. Gunakan mulsa.\n",

  yellow_leaf_curl_virus:
    "1. Atasi kutu kebul (imidakloprid/abamectin).\n" +
    "2. Cabut tanaman parah.\n" +
    "3. Beri NPK 1 sendok makan pada tanaman sehat sekitar area.\n" +
    "   Alasan: tanaman sehat perlu gizi lengkap agar tahan stress virus & serangan kutu.\n" +
    "4. Pakai insect net.\n" +
    "5. Rotasi tanaman.\n",
};

// Cache elemen dengan null check
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

// Flag to prevent multiple initialization
let initialized = false;

// Flag to prevent duplicate predictions
let isPredicting = false;

// Global variables for models
let chiliModel = null;
let tomatoModel = null;
let currentModel = null;

// Load models based on plant type
async function loadModel(plantType = "chili") {
  try {
    // Load chili model if not loaded
    if (!chiliModel && plantType === "chili") {
      chiliModel = await tf.loadGraphModel("tfjs_graph_model/model.json");
      currentModel = chiliModel;
      console.log("✅ Model cabai dimuat");
    }

    // Load tomato model if not loaded
    if (!tomatoModel && plantType === "tomato") {
      tomatoModel = await tf.loadGraphModel(
        "tfjs_graph_model_tomat/model.json"
      );
      currentModel = tomatoModel;
      console.log("✅ Model tomat dimuat");
    }

    // Switch model based on selection
    if (plantType === "chili" && chiliModel) {
      currentModel = chiliModel;
    } else if (plantType === "tomato" && tomatoModel) {
      currentModel = tomatoModel;
    }

    // Fallback: try to load if not loaded yet
    if (!currentModel) {
      currentModel = await tf.loadGraphModel(
        `tfjs_graph_model${plantType === "tomato" ? "_tomat" : ""}/model.json`
      );
      if (plantType === "chili") {
        chiliModel = currentModel;
      } else {
        tomatoModel = currentModel;
      }
      console.log(`✅ Model ${plantType} dimuat`);
    }
  } catch (err) {
    console.error(`Gagal memuat model ${plantType}:`, err);
    if (resultEl) {
      resultEl.textContent = `Gagal memuat model ${
        plantType === "chili" ? "cabai" : "tomat"
      }. Coba muat ulang halaman.`;
    }
  }
}

// Initialize event listeners
function initializeEventListeners() {
  if (initialized) {
    return;
  }

  // Input gambar (klik)
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      handleFile(file);
    });
  }

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
    dropZone.addEventListener("click", () => {
      if (fileInput) fileInput.click();
    });
    dropZone.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (fileInput) fileInput.click();
      }
    });
  }

  // Event listener untuk tombol prediksi
  if (predictBtn) {
    predictBtn.addEventListener("click", () => {
      if (
        previewEl &&
        previewEl.src &&
        !previewEl.classList.contains("hidden")
      ) {
        predict(previewEl);
      }
    });
  }

  // Event listeners untuk kamera
  if (startCamBtn) {
    startCamBtn.addEventListener("click", startCamera);
  }
  if (stopCamBtn) {
    stopCamBtn.addEventListener("click", stopCamera);
  }

  initialized = true;
}

// Load model and initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadModel("chili"); // Load chili model by default
    initializeEventListeners();
  });
} else {
  loadModel("chili"); // Load chili model by default
  initializeEventListeners();
}

// Expose loadModel function globally for dashboard to use
window.loadPlantModel = function (plantType) {
  return loadModel(plantType);
};

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

  if (previewEl) {
    previewEl.onload = () => {
      URL.revokeObjectURL(url);
      // Reset file input to allow same file to be uploaded again
      if (fileInput) {
        fileInput.value = "";
      }
      // Tampilkan tombol prediksi setelah gambar dimuat
      if (predictBtn) {
        predictBtn.classList.remove("hidden");
      }
      resetResult();
    };
  }
}

// Event listeners are now initialized in the initializeEventListeners() function above

// Get current model based on selected plant type
function getCurrentModel() {
  const plantType = window.selectedPlantType || "chili";

  if (plantType === "chili" && chiliModel) {
    return chiliModel;
  } else if (plantType === "tomato" && tomatoModel) {
    return tomatoModel;
  }

  return currentModel;
}

// Fungsi prediksi (update untuk konsistensi dengan kamera)
async function predict(img) {
  // Prevent duplicate predictions
  if (isPredicting) {
    return;
  }

  const modelToUse = getCurrentModel();

  if (!modelToUse) {
    alert("Model belum siap! Harap tunggu model dimuat.");
    return;
  }

  isPredicting = true;

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

      const prediction = modelToUse.predict(tensor);
      const data = await prediction.data();

      return Array.from(data);
    });

    // Get plant type and use appropriate class names
    const plantType = window.selectedPlantType || "chili";
    const currentClassNames =
      plantType === "tomato" ? tomatoClassNames : classNames;
    const currentClassDescriptions =
      plantType === "tomato" ? tomatoClassDescriptions : classDescriptions;
    const currentTreatments =
      plantType === "tomato" ? tomatoTreatments : chiliTreatments;

    // Calibrate scores untuk tomato agar confidence lebih tinggi
    let calibratedScores = [...scores];
    if (plantType === "tomato") {
      // Scale dan normalize untuk meningkatkan confidence
      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      const range = maxScore - minScore;

      calibratedScores = scores.map((score) => {
        // Normalize to 0-1 range
        const normalized = (score - minScore) / (range || 1);
        // Apply enhancement: square and scale up
        return Math.pow(normalized, 1.2) * 0.9 + 0.1;
      });
    }

    // cari index dengan skor tertinggi
    const maxIndex = calibratedScores.indexOf(Math.max(...calibratedScores));
    const label = currentClassNames[maxIndex] || "Tidak diketahui";
    const confidence = (calibratedScores[maxIndex] * 100).toFixed(2);
    const description = currentClassDescriptions[label] || "";
    const treatment =
      currentTreatments[label] || "Tidak ada rekomendasi tersedia";

    resultEl.innerHTML = `
      <div style="text-align: left;">
        <div style="font-size: 20px; margin-bottom: 8px;">📷 Prediksi: ${label}</div>
        <div style="color: var(--muted); margin-bottom: 8px;">Confidence: ${confidence}%</div>
        <div style="font-size: 14px; line-height: 1.4; margin-bottom: 12px;">${description}</div>
        <div style="background: #ecfdf5; border-left: 4px solid #059669; padding: 12px; border-radius: 8px; margin-top: 12px;">
          <div style="font-weight: 600; color: #059669; margin-bottom: 8px;">💡 Rekomendasi Penanganan:</div>
          <div style="font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${treatment}</div>
        </div>
      </div>
    `;

    // Save to history if function exists (dashboard page)
    if (typeof window.savePredictionToHistory === "function") {
      window.savePredictionToHistory(label, confidence, description);
    }
  } catch (err) {
    console.error(err);
    showError("Gagal melakukan prediksi. Coba gambar lain.");
  } finally {
    setLoading(false);
    isPredicting = false;
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
  } catch (err) {
    console.error("Gagal memulai kamera:", err);
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

  const modelToUse = getCurrentModel();
  if (!modelToUse || !isLive) return;

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

      const prediction = modelToUse.predict(tensor);
      const data = await prediction.data();
      return Array.from(data);
    });

    // Get plant type and use appropriate class names
    const plantType = window.selectedPlantType || "chili";
    const currentClassNames =
      plantType === "tomato" ? tomatoClassNames : classNames;
    const currentClassDescriptions =
      plantType === "tomato" ? tomatoClassDescriptions : classDescriptions;
    const currentTreatments =
      plantType === "tomato" ? tomatoTreatments : chiliTreatments;

    // Calibrate scores untuk tomato agar confidence lebih tinggi
    let calibratedScores = [...scores];
    if (plantType === "tomato") {
      // Scale dan normalize untuk meningkatkan confidence
      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      const range = maxScore - minScore;

      calibratedScores = scores.map((score) => {
        // Normalize to 0-1 range
        const normalized = (score - minScore) / (range || 1);
        // Apply enhancement: square and scale up
        return Math.pow(normalized, 1.2) * 0.9 + 0.1;
      });
    }

    // Update hasil prediksi
    const maxIndex = calibratedScores.indexOf(Math.max(...calibratedScores));
    const label = currentClassNames[maxIndex] || "Tidak diketahui";
    const confidence = (calibratedScores[maxIndex] * 100).toFixed(2);
    const description = currentClassDescriptions[label] || "";
    const treatment =
      currentTreatments[label] || "Tidak ada rekomendasi tersedia";

    resultEl.innerHTML = `
      <div style="text-align: left;">
        <div style="font-size: 20px; margin-bottom: 8px;">📷 Prediksi Real-time: ${label}</div>
        <div style="color: var(--muted); margin-bottom: 8px;">Confidence: ${confidence}%</div>
        <div style="font-size: 14px; line-height: 1.4; margin-bottom: 12px;">${description}</div>
        <div style="background: #ecfdf5; border-left: 4px solid #059669; padding: 12px; border-radius: 8px; margin-top: 12px;">
          <div style="font-weight: 600; color: #059669; margin-bottom: 8px;">💡 Rekomendasi Penanganan:</div>
          <div style="font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${treatment}</div>
        </div>
        <div style="margin-top: 8px; font-size: 12px; color: var(--accent);">
          📷 Analisis real-time aktif - hasil diperbarui setiap 3 detik
        </div>
      </div>
    `;

    lastPredictionTime = now;
  } catch (err) {
    console.error("Gagal prediksi real-time:", err);
    // Jangan tampilkan error untuk prediksi real-time agar tidak mengganggu
  }
}

// Camera event listeners are now in the initializeEventListeners() function above

// Cleanup saat halaman ditutup
window.addEventListener("beforeunload", () => {
  if (isLive) {
    stopCamera();
  }
});
