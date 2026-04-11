// ================= LOGIN CHECK =================
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "index.html";
}

// ================= LOGOUT =================
document.getElementById("logoutBtn").onclick = function () {
  localStorage.removeItem("token");
  window.location.href = "index.html";
};

// ================= CITY DROPDOWN =================
const cities = {

  Punjab: [
    "Lahore", "Faisalabad", "Rawalpindi", "Multan",
    "Gujranwala", "Sialkot", "Bahawalpur", "Sargodha"
  ],

  Sindh: [
    "Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpur Khas"
  ],

  KPK: [
    "Peshawar", "Abbottabad", "Mardan", "Swat", "Kohat"
  ],

  Balochistan: [
    "Quetta", "Gwadar", "Khuzdar", "Turbat"
  ]

};

const provinceSelect = document.getElementById("province");
const citySelect = document.getElementById("city");

provinceSelect.onchange = function () {

  const selectedProvince = this.value;

  citySelect.innerHTML = '<option value="">Select City</option>';

  if (cities[selectedProvince]) {

    cities[selectedProvince].forEach(function (city) {

      let option = document.createElement("option");
      option.value = city;
      option.text = city;

      citySelect.appendChild(option);

    });

  }
};

// ================= GOOGLE MAP =================
let map;
let marker;

window.initMap = function () {

  const defaultLocation = { lat: 30.3753, lng: 69.3451 }; // Pakistan center

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: defaultLocation
  });

  marker = new google.maps.Marker({
    position: defaultLocation,
    map: map,
    draggable: true
  });

  // store location
  window.selectedLocation = defaultLocation;

  // update location on drag
  marker.addListener("dragend", function () {

    window.selectedLocation = {
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng()
    };

  });
};

// ================= SUBMIT COMPLAINT =================
document.getElementById("complaintForm").addEventListener("submit", async function (e) {

  e.preventDefault();

  const formData = new FormData();

  formData.append("department", document.getElementById("department").value);
  formData.append("province", document.getElementById("province").value);
  formData.append("city", document.getElementById("city").value);
  formData.append("area", document.getElementById("area").value);
  formData.append("title", document.getElementById("title").value);
  formData.append("description", document.getElementById("description").value);

  // LOCATION
  formData.append("lat", window.selectedLocation?.lat || 0);
  formData.append("lng", window.selectedLocation?.lng || 0);

  // IMAGES (multiple upload)
  const files = document.getElementById("image").files;

  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  try {

    const res = await fetch("/api/grievance", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      },
      body: formData
    });

    const data = await res.json();

    if (res.ok) {

      alert("Complaint submitted successfully ✅");

      document.getElementById("complaintForm").reset();

      window.location.href = "dashboard.html";

    } else {

      alert(data.msg || "Something went wrong");

    }

  } catch (err) {

    console.error(err);
    alert("Server error. Please try again.");

  }

});