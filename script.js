function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!username || !password) {
    alert("Isi username, email dan password!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    alert("Username sudah digunakan!");
    return;
  }

  users[username] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", username);
  window.location.href = "index.html";
}

function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!username || !password) {
    alert("Isi username, email dan password!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username] && users[username].password === password) {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "index.html";
  } else {
    alert("Username, Email atau password salah!");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function checkLogin() {
  const user = localStorage.getItem("loggedInUser");
  const profileDiv = document.getElementById("profile");
  const authButtons = document.getElementById("authButtons");
  const profileName = document.getElementById("profileName");

  if (user) {
    if (profileDiv && authButtons) {
      profileDiv.style.display = "block";
      authButtons.style.display = "none";
      profileDiv.innerHTML = `
        
        <button onclick="logout()">Logout</button>
      `;
    }

    if (profileName) {
      profileName.innerHTML = `<p>👤${user}</p>`;
    }
  } else {
    if (profileDiv) profileDiv.style.display = "none";
    if (authButtons) authButtons.style.display = "block";
  }
}

function checkProfileAccess() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    alert("Kamu harus login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  const info = document.getElementById("usernameInfo");
  if (info) {
    info.innerHTML = `Selamat datang, <strong>${user}</strong>`;
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

function joinDiscord() {
  window.open("https://discord.gg/QgHj8gBG", "_blank");
}

function copyIP() {
  navigator.clipboard.writeText("play.solaSMP.mc");
}

function playSound() {
  const audio = document.getElementById("joinSound");
  if (audio) audio.play();
}

function animatePage() {
  document.querySelectorAll(".animated").forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(100px)";
    setTimeout(() => {
      el.style.transition = "all 0.8s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, i * 150);
  });
}
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}
// Setting Theme
function changeTheme() {
  const theme = document.getElementById("theme-select").value;
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

// Setting Sound
function toggleSound() {
  const enabled = document.getElementById("sound-toggle").checked;
  localStorage.setItem("sound", enabled ? "on" : "off");
}

// Reset akun
function resetAccount() {
  if (confirm("Yakin ingin reset akun? Semua data akan hilang.")) {
    localStorage.clear();
    alert("Akun berhasil direset.");
    location.href = "index.html";
  }
}
function loadSettings() {
  // Load suara toggle
  const soundEnabled = localStorage.getItem("soundEnabled") === "true";
  document.getElementById("soundToggle").checked = soundEnabled;

  // Load dark mode
  const darkMode = localStorage.getItem("darkMode") === "true";
  document.getElementById("darkModeToggle").checked = darkMode;

  applyDarkMode(darkMode);

  // Event listeners
  document.getElementById("soundToggle").addEventListener("change", function () {
    localStorage.setItem("soundEnabled", this.checked);
  });

  document.getElementById("darkModeToggle").addEventListener("change", function () {
    localStorage.setItem("darkMode", this.checked);
    applyDarkMode(this.checked);
  });
}

function applyDarkMode(isDark) {
  if (isDark) {
    document.body.style.background = "#111";
    document.body.style.color = "#eee";
  } else {
    document.body.style.background = "linear-gradient(to bottom, #1d1d1d, #2a2a2a)";
    document.body.style.color = "white";
  }
}

// Gunakan preferensi suara
function playSound() {
  const enabled = localStorage.getItem("soundEnabled") === "true";
  const audio = document.getElementById("joinSound");
  if (enabled && audio) audio.play();
}
function updateAccount() {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const currentUser = localStorage.getItem("loggedInUser");

  const oldPass = document.getElementById("oldPassword").value;
  const newUser = document.getElementById("newUsername").value.trim();
  const newPass = document.getElementById("newPassword").value;

  if (!currentUser || !users[currentUser]) {
    alert("Kamu tidak login.");
    return;
  }

  if (users[currentUser].password !== oldPass) {
    alert("Password lama salah!");
    return;
  }

  // Ganti username jika dimasukkan
  let finalUser = currentUser;
  if (newUser && newUser !== currentUser) {
    if (users[newUser]) {
      alert("Username baru sudah dipakai!");
      return;
    }
    users[newUser] = { password: users[currentUser].password };
    delete users[currentUser];
    finalUser = newUser;
  }

  // Ganti password jika dimasukkan
  if (newPass) {
    users[finalUser].password = newPass;
  }

  // Simpan
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", finalUser);
  alert("Akun berhasil diperbarui!");

  // Reset input
  document.getElementById("oldPassword").value = "";
  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
}
