// toggle UI
const container = document.getElementById("container");
const toggleBtn = document.getElementById("toggle");

const title = document.getElementById("left-title");
const text = document.getElementById("left-text");

let registerMode = false;

toggleBtn.onclick = () => {
  container.classList.toggle("active");
  registerMode = !registerMode;

  if (registerMode) {
    title.innerText = "Welcome Back!";
    text.innerText = "Already have an account";
    toggleBtn.innerText = "Login";
  } else {
    title.innerText = "Hello, Welcome!";
    text.innerText = "Don't have an account?";
    toggleBtn.innerText = "Register";
  }
};

// LOGIN FORM (ONLY REAL LOGIN)
// LOGIN BUTTON FIX (IMPORTANT)
document.getElementById("loginBtn").onclick = function () {

  const email = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  $.ajax({
    url: "/api/auth/login",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      email,
      password
    }),

    success: function (res) {
      console.log(res);

      if (res.token) {
        localStorage.setItem("token", res.token);
        window.location.href = "dashboard.html"; // ✅ FIXED REDIRECT
      } else {
        alert("Login failed");
      }
    },

    error: function () {
      alert("Login error");
    }
  });
};
// GUEST LOGIN (FIXED)
document.getElementById("guestBtn").onclick = () => {
  // OPTION 1: allow guest without auth (NO LOOP FIX)
  localStorage.setItem("token", "guest");
  window.location.href = "dashboard.html";
};

// FORGOT PASSWORD
const forgot = document.querySelector(".forgot");
const modal = document.getElementById("forgotModal");
const closeModal = document.getElementById("closeModal");

if (forgot && modal) {
  forgot.onclick = () => {
    modal.style.display = "flex";
  };
}

if (closeModal && modal) {
  closeModal.onclick = () => {
    modal.style.display = "none";
  };
}