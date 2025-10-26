// Authentication Logic
document.addEventListener("DOMContentLoaded", function () {
  // Check if user is already logged in
  checkAuth();

  const loginForm = document.getElementById("loginForm");
  const demoLoginBtn = document.getElementById("demoLoginBtn");
  const signupLink = document.getElementById("signupLink");
  const signupForm = document.getElementById("signupForm");
  const loginLink = document.getElementById("loginLink");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (demoLoginBtn) {
    demoLoginBtn.addEventListener("click", handleDemoLogin);
  }

  if (signupLink) {
    signupLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "signup.html";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  if (loginLink) {
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }
});

// Check if user is authenticated
// Check if user is authenticated
function checkAuth() {
  const currentPage = window.location.pathname;
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  // If on dashboard and not authenticated, redirect to login
  if (currentPage.includes("dashboard") && !isAuthenticated) {
    window.location.href = "login.html";
  }

  // If on login and authenticated, AUTO REDIRECT to dashboard

  if (currentPage.includes("login") && isAuthenticated) {
    // Redirect langsung tanpa delay
    window.location.href = "dashboard.html";
    return;
  }
  // If on signup and authenticated, redirect to dashboard
  if (currentPage.includes("signup") && isAuthenticated) {
    window.location.href = "dashboard.html";
  }

  // If on index and trying to access demo, redirect to login
  if (currentPage.includes("index") || currentPage.endsWith("/")) {
    const demoButtons = document.querySelectorAll('a[href="#demo"]');
    demoButtons.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const isAuth = sessionStorage.getItem("isAuthenticated") === "true";
        if (!isAuth) {
          e.preventDefault();
          window.location.href = "login.html";
        }
      });
    });
  }
}

// Handle login form submission
function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const loginBtn = document.getElementById("loginBtn");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  // Clear previous errors
  usernameError.textContent = "";
  usernameError.classList.remove("show");
  passwordError.textContent = "";
  passwordError.classList.remove("show");

  // Basic validation
  if (!username) {
    usernameError.textContent = "Username harus diisi";
    usernameError.classList.add("show");
    return;
  }

  if (!password) {
    passwordError.textContent = "Password harus diisi";
    passwordError.classList.add("show");
    return;
  }

  // Disable button and show loading
  loginBtn.disabled = true;
  loginBtn.textContent = "Memproses...";

  // Simulate login API call
  setTimeout(() => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find user by username
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Set authentication
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("fullname", user.fullname);
        sessionStorage.setItem("email", user.email);

        // Redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        // Check if username exists
        const userExists = users.some((u) => u.username === username);
        if (userExists) {
          passwordError.textContent = "Password salah";
        } else {
          usernameError.textContent = "Username tidak ditemukan";
        }
        usernameError.classList.add("show");
        passwordError.classList.add("show");
        loginBtn.disabled = false;
        loginBtn.textContent = "Masuk";
      }
    } catch (error) {
      console.error("Login error:", error);
      passwordError.textContent = "Terjadi kesalahan. Coba lagi.";
      passwordError.classList.add("show");
      loginBtn.disabled = false;
      loginBtn.textContent = "Masuk";
    }
  }, 1000);
}

// Handle demo login (bypass authentication)
function handleDemoLogin() {
  const demoBtn = document.getElementById("demoLoginBtn");

  // Set authentication
  sessionStorage.setItem("isAuthenticated", "true");
  sessionStorage.setItem("username", "demo");

  // Disable button
  demoBtn.disabled = true;
  demoBtn.textContent = "Mengalihkan...";

  // Redirect to dashboard
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 500);
}

// Logout function
function logout() {
  sessionStorage.removeItem("isAuthenticated");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("fullname");
  sessionStorage.removeItem("email");
  window.location.href = "index.html";
}

// Make logout available globally
window.logout = logout;

// Handle signup form submission
function handleSignup(e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const signupBtn = document.getElementById("signupBtn");

  // Get error elements
  const fullnameError = document.getElementById("fullnameError");
  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // Clear previous errors
  [
    fullnameError,
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
  ].forEach((el) => {
    if (el) {
      el.textContent = "";
      el.classList.remove("show");
    }
  });

  let hasError = false;

  // Validation
  if (!fullname || fullname.length < 2) {
    if (fullnameError) {
      fullnameError.textContent = "Nama lengkap minimal 2 karakter";
      fullnameError.classList.add("show");
    }
    hasError = true;
  }

  if (!username || username.length < 3) {
    if (usernameError) {
      usernameError.textContent = "Username minimal 3 karakter";
      usernameError.classList.add("show");
    }
    hasError = true;
  } else {
    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.some((u) => u.username === username)) {
      if (usernameError) {
        usernameError.textContent = "Username sudah digunakan";
        usernameError.classList.add("show");
      }
      hasError = true;
    }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (emailError) {
      emailError.textContent = "Email tidak valid";
      emailError.classList.add("show");
    }
    hasError = true;
  }

  if (!password || password.length < 6) {
    if (passwordError) {
      passwordError.textContent = "Password minimal 6 karakter";
      passwordError.classList.add("show");
    }
    hasError = true;
  }

  if (password !== confirmPassword) {
    if (confirmPasswordError) {
      confirmPasswordError.textContent = "Konfirmasi password tidak cocok";
      confirmPasswordError.classList.add("show");
    }
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // Disable button and show loading
  signupBtn.disabled = true;
  signupBtn.textContent = "Membuat akun...";

  // Simulate API call
  setTimeout(() => {
    try {
      // Get existing users or create new array
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        fullname: fullname,
        username: username,
        email: email,
        password: password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
      };

      // Add user to array
      existingUsers.push(newUser);

      // Save to localStorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Auto-login after signup
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("fullname", fullname);
      sessionStorage.setItem("email", email);

      // Redirect to dashboard
      window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Error during signup:", error);
      if (usernameError) {
        usernameError.textContent = "Terjadi kesalahan. Coba lagi.";
        usernameError.classList.add("show");
      }
      signupBtn.disabled = false;
      signupBtn.textContent = "Daftar Sekarang";
    }
  }, 1500);
}
