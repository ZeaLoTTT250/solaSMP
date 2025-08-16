function register() {
  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!username || !email || !password) {
    alert("Isi semua data!");
    return;
  }

  let names = JSON.perse(localStorage.getItem("names")) || {};

  if (names[username]) {
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    alert("Email sudah terdaftar!");
    return;
  }

  users[email] = { username, password };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("loggedInUser", email);
  window.location.href = "index.html";
}

function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Isi email dan password!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email] && users[email].password === password) {
    localStorage.setItem("loggedInUser", email);
    window.location.href = "index.html";
  } else {
    alert("Email atau password salah!");
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
      profileName.innerHTML = `<p>👤${name}</p>`;
    }
  } else {
    if (profileDiv) profileDiv.style.display = "none";
    if (authButtons) authButtons.style.display = "block";
  }
}

function checkProfileAccess() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    alert("Kamu harus login dahulu!");
    window.location.href = "login.html";
  } else {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    document.getElementById("profileInfo").innerText = 
      `Email: ${user}\nNama: ${users[user].name || "(Belum diatur)"}`;
  }
}

function changeName() {
  const newName = document.getElementById("newName").value.trim();
  if (!newName) {
    alert("Nama tidak boleh kosong!");
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || {};
  const user = localStorage.getItem("loggedInUser");
  if (users[user]) {
    users[user].name = newName;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Nama berhasil diubah!");
    location.reload();
  }
}

function changePassword() {
  const newPass = document.getElementById("newPassword").value;
  if (!newPass) {
    alert("Password tidak boleh kosong!");
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || {};
  const user = localStorage.getItem("loggedInUser");
  if (users[user]) {
    users[user].password = newPass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password berhasil diubah!");
  }
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
function changePassword() {
  let newPass = document.getElementById("newPassword").value;
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx].password = newPass;
      localStorage.setItem("users", JSON.stringify(users));
      user.password = newPass;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("✅ Password berhasil diubah!");
      document.getElementById("newPassword").value = "";
    }
  } else {
    alert("⚠️ Kamu harus login dulu!");
    window.location.href = "login.html";
  }
}
