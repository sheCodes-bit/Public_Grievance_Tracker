const api="/api/grievances"

async function loadAdmin(){

const res=await fetch(api)

const data=await res.json()

const list=document.getElementById("adminList")

list.innerHTML=""

let pending=0
let resolved=0

data.forEach(g=>{
if (g.status === "Pending") pending++;
if (g.status === "Resolved") resolved++;

list.innerHTML+=`

<div class="card p-3 mb-3">

<h5>${g.title}</h5>

<p>${g.description}</p>

<b>Status:</b> ${g.status}

<br><br>
<button onclick="resolve('${g._id}')">
Resolve
</button>

<button onclick="del('${g._id}')">
Delete
</button>

</div>

`

})

drawChart(pending,resolved)

}

function resolve(id){

fetch(api + "/status/" + id,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({ status: "Resolved" }) 
})
.then(loadAdmin)

}

function del(id){

fetch(api+"/"+id,{
method:"DELETE"
}).then(loadAdmin)

}

function drawChart(p,r){

new Chart(document.getElementById("chart"),{

type:"pie",

data:{
labels:["Pending","Resolved"],
datasets:[{
data:[p,r]
}]
}

})

}

loadAdmin()