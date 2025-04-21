const form = document.getElementById("studentForm");
const inputelement = document.getElementsByTagName("input");
let arr = JSON.parse(localStorage.getItem("studentDetails")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = this.querySelectorAll("input");
  let hasEmptyField = false;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      hasEmptyField = true;
      input.style.borderColor = "red"; // Optional: visual cue
    } else {
      input.style.borderColor = ""; // Reset if previously marked
    }
  });

  if (hasEmptyField) {
    alert("Please fill out all fields.");
    return;
  }

  const formdata = new FormData(form);
  const data = Object.fromEntries(formdata.entries());
  console.log(data);
  arr.push(data);
  localStorage.setItem("studentDetails", JSON.stringify(arr));
  arr = JSON.parse(localStorage.getItem("studentDetails"));
  refresh();
  this.reset();
});

function refresh() {
  const tablebody = document.getElementById("studenttable");
  tablebody.innerHTML = "";
  console.log(arr.length);
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    row.id = `row-${i}`;

    const nameCell = document.createElement("td");
    nameCell.textContent = arr[i].studentName;

    const studentidCell = document.createElement("td");
    studentidCell.textContent = arr[i].studentid;

    const emailIdCell = document.createElement("td");
    emailIdCell.textContent = arr[i].emailId;

    const contactCell = document.createElement("td");
    contactCell.textContent = arr[i].contactNo;

    const buttoncell = document.createElement("td");
    const deleteCell = document.createElement("button");
    deleteCell.textContent = "delete";
    deleteCell.addEventListener("click", () => deleteItem(i));

    const icondelete = document.createElement("i");
    icondelete.className = "fa-solid fa-trash";

    const updateCell = document.createElement("button");
    updateCell.textContent = "Edit";

    updateCell.addEventListener("click", () => editItem(i));

    const iconedit = document.createElement("i");
    iconedit.className = "fa-solid fa-pen-to-square";

    buttoncell.appendChild(updateCell);
    buttoncell.appendChild(deleteCell);

    updateCell.prepend(iconedit);
    deleteCell.prepend(icondelete);
    row.appendChild(nameCell);
    row.appendChild(studentidCell);
    row.appendChild(emailIdCell);
    row.appendChild(contactCell);
    row.appendChild(buttoncell);

    tablebody.appendChild(row);
  }
}

function deleteItem(i) {
  arr.splice(i, 1);
  localStorage.setItem("studentDetails", JSON.stringify(arr));
  arr = JSON.parse(localStorage.getItem("studentDetails"));
  refresh();
}
function editItem(index) {
  console.log("hi", index);
  const row = document.getElementById(`row-${index}`);
  console.log(row.cells[4]);

  const nameInput = row.cells[0];
  const studentIdInput = row.cells[1];
  const emailInput = row.cells[2];
  const contactInput = row.cells[3];
  const buttoncell = row.cells[4];

  const isEditing = buttoncell.querySelector("button").textContent === "Save";
  if (!isEditing) {
    nameInput.innerHTML = `<input type="text" value="${arr[index].studentName}" />`;
    studentIdInput.innerHTML = `<input type="text" value="${arr[index].studentid}" />`;
    emailInput.innerHTML = `<input type="text" value="${arr[index].emailId}" />`;
    contactInput.innerHTML = `<input type="text" value="${arr[index].contactNo}" />`;
    buttoncell.innerHTML = `<button onclick="editItem(${index})">Save</button>`;
  } else {
    console.log("helllllll");
    const newName = nameInput.querySelector("input").value.trim();
    const newstudentId = studentIdInput.querySelector("input").value.trim();
    const newemail = emailInput.querySelector("input").value.trim();
    const newcontact = contactInput.querySelector("input").value.trim();

    arr[index] = {
      studentName: newName,
      studentid: newstudentId,
      emailId: newemail,
      contactNo: newcontact,
    };

    localStorage.setItem("studentDetails", JSON.stringify(arr));
    arr = JSON.parse(localStorage.getItem("studentDetails"));
    refresh();
  }
}

refresh();
