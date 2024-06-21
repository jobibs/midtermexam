const content = document.querySelector("#content");
const submit = document.querySelector("#submit");
const update = document.querySelector("#updateBtn");

//POST
submit.addEventListener("click", () => {
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let email = document.querySelector("#email").value;
  let gender = document.querySelector("#gender").value;
  let formData = { fname, lname, email, gender };
  fetch("http://localhost:5000/api/members", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => console.log(error));
  //====== add this ======
  alert("Successfully inserted!");
  location.reload();
  //======================
});

window.addEventListener("load", () => {
  getUsers();
});

function getUsers() {
  let html = "";

  //https://apicrudpm-nc9c.onrender.com/api/members
  fetch("http://localhost:5000/api/members", { mode: "cors" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //display DOM
      data.forEach((element) => {
        html += `<li>${element.first_name} ${element.last_name} ${element.ip_address} <a href="javascript:void(0)" onClick="deleteMember(${element.id})"> Delete </a></a></li> <a href="javascript:void(0)" onClick="editMember(${element.id})"> Edit </a>`;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteMember(id) {
  let text = "Press a button!\nEither OK or Cancel.";
  if (confirm(text) == true) {
    let formData = { id };
    fetch("http://localhost:5000/api/members", {
      method: "DELETE",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    fetch("http://localhost:5000/api/members", {
      method: "DELETE",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    //====== add this ======
    alert("Successfully inserted!");
    location.reload();
    //======================
  } else {
    text = "You cancelled!";
  }
}

//UPDATE - PUT
function editMember(id) {
  fetch(`http://localhost:5000/api/members/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#fname").value = data[0].first_name;
      document.querySelector("#lname").value = data[0].last_name;
      document.querySelector("#email").value = data[0].email;
      document.querySelector("#gender").value = data[0].gender;
      document.querySelector("#ID").value = data[0].id;
      document.querySelector("#ip_address").value = data[0].ip_address;
    })
    .catch((error) => console.log(error));
}
update.addEventListener("click", () => {
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let email = document.querySelector("#email").value;
  let gender = document.querySelector("#gender").value;
  let id = document.querySelector("#ID").value;
  let ip_address = document.querySelector("#ip_address").value;
  let formData = { fname, lname, email, gender, id, ip_address };
  fetch("http://localhost:5000/api/members", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => console.log(error));
  alert("Successfully updated!");
    location.reload();
});
