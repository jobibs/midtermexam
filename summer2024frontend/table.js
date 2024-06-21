const content = document.querySelector("#content");
const submit = document.querySelector("#submit");
const update = document.querySelector("#updateBtn");
const employeeData = []
  const recordsPerPage = 10;
  let currentPage = 1;
  function populateTable() {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const slicedData = employeeData.slice(startIndex, endIndex);
    const tableBody = document.getElementById("employeeData");
    tableBody.innerHTML = ""; // Clear previous content
    //https://apicrudpm-nc9c.onrender.com/api/members
    fetch("http://localhost:5000/api/members", { mode: "cors" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        //display DOM
        data.forEach((element) => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
              <td>${element.id}</td>
              <td>${element.first_name}</td>
              <td>${element.last_name}</td>
              <td>${element.email}</td>
              <td>${element.gender}</td>

                    <td>
        <button class="btn btn-sm btn-primary edit-btn" <a href="javascript:void(0)" onClick="editMember(${element.id})">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn" <a href="javascript:void(0)" onClick="deleteMember(${element.id})">Delete</button>
        </td>

              <td>${element.ip_address}</td>

            `;
            tableBody.appendChild(tableRow);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  populateTable();

  submit.addEventListener("click", () => {
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let gender = document.querySelector("#gender").value;
    let ip_address = document.querySelector("#ip_address").value;
    let formData = { fname, lname, email, gender, ip_address };
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
      alert("Successfully deleted!");
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
