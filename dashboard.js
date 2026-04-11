
// CHECK LOGIN TOKEN

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (!token && role !== "guest") {
  window.location.href = "index.html";
}


// LOGOUT

document.getElementById("logoutBtn").onclick=function(){

localStorage.removeItem("token");

window.location.href="index.html";

};


// GO TO COMPLAINT PAGE

function goComplaint(){

window.location.href="complaint.html"

}