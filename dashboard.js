const API = "/api/grievances";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

// LOAD GRIEVANCES
function load() {
  $.ajax({
    url: API,
    headers: {
      Authorization: "Bearer " + token
    },
    success: function(data){

      $("#grievanceContainer").empty();

      data.forEach(g => {

        $("#grievanceContainer").append(`
          <div class="col-md-4 mb-3">
            <div class="card p-3 shadow-sm">

              <h5>${g.title}</h5>
              <p>${g.desc}</p>

              <span class="badge bg-warning">${g.status}</span>

              <hr>

              <button class="btn btn-success btn-sm vote" data-id="${g._id}">
                👍 ${g.votes}
              </button>

              <button class="btn btn-danger btn-sm delete" data-id="${g._id}">
                Delete
              </button>

            </div>
          </div>
        `);

      });
    }
  });
}

// SUBMIT
$("#grievanceForm").submit(function(e){
  e.preventDefault();

  $.ajax({
    url: API,
    type: "POST",
    headers: { Authorization: "Bearer " + token },
    contentType: "application/json",
    data: JSON.stringify({
      title: $("#title").val(),
      desc: $("#desc").val(),
      category: $("#category").val(),
      priority: $("#priority").val()
    }),
    success: function(){
      load();
      $("#grievanceForm")[0].reset();
    }
  });
});

// VOTE
$(document).on("click", ".vote", function(){
  const id = $(this).data("id");

  $.ajax({
    url: `${API}/vote/${id}`,
    type: "PUT",
    headers: { Authorization: "Bearer " + token },
    success: load
  });
});

// DELETE
$(document).on("click", ".delete", function(){
  const id = $(this).data("id");

  $.ajax({
    url: `${API}/${id}`,
    type: "DELETE",
    headers: { Authorization: "Bearer " + token },
    success: load
  });
});

// INIT
load();