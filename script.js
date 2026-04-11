// FORM TOGGLE
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const container = document.getElementById("container");
const toggleBtn = document.getElementById("toggle");

const title = document.getElementById("left-title");
const text = document.getElementById("left-text");

let registerMode = false;

toggleBtn.onclick = () => {

container.classList.toggle("active");

registerMode = !registerMode;

if(registerMode){

title.innerText="Welcome Back!";
text.innerText="Already have an account?";
toggleBtn.innerText="Login";

}else{

title.innerText="Hello, Welcome!";
text.innerText="Don't have an account?";
toggleBtn.innerText="Register";

}

};




// LOGIN
document.getElementById("loginForm").addEventListener("submit", async (e) => {
 
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email, password})
  });

  const data = await res.json();

  if(res.ok){
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  }else{
    alert(data.msg || "Login failed");
  }
});



// REGISTER
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("regUser").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name, email, password})
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registered successfully!");
    window.location.reload();
  } else {
    alert(data.msg || "Register failed");
  }
});



// GUEST LOGIN

document.getElementById("guestBtn").addEventListener("click", () => {
  localStorage.setItem("role","guest");
  window.location.href = "dashboard.html";
});




// FORGOT PASSWORD

const forgot=document.querySelector(".forgot");
const modal=document.getElementById("forgotModal");
const closeModal=document.getElementById("closeModal");

if(forgot){

forgot.onclick= () => {

modal.style.display="flex";

};


closeModal.onclick=()=>{

modal.style.display="none";

};

}