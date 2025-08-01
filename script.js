function register() {
  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const confirmpassword = document.getElementById("regConfirmpassword").value;

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
  const email =document.getElementById("loginEmail").value;
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
    alert("Username atau password salah!");
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
    alert("Kamu harus login dahulu!");
    window.location.href = "login.html";
  } else {
    const info = document.getElementById("usernameInfo");
    if (info) {
      info.innerText = `Selamat datang, ${user}!`;
    }
  }
}

function joinDiscord() {
  window.open("https://discord.gg/WhApJpnZ", "_blank");
}

function copyIP() {
  navigator.clipboard.writeText("play.solaSMP.mc");
  alert("IP berhasil disalin!");
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