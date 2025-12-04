// ----- Classes -----
class Student {
  constructor(id, name, section, result) {
    this.id = id;
    this.name = name;
    this.section = section;
    this.result = result;
  }
}

class Result {
  constructor(maths, science, english) {
    this.maths = Number(maths);
    this.science = Number(science);
    this.english = Number(english);
  }

  total() {
    return this.maths + this.science + this.english;
  }

  average() {
    return this.total() / 3;
  }
}

// ----- API URL -----
const API = "http://localhost:3000/students";

// ----- DOM Elements -----
const studentForm = document.getElementById("studentForm");
const studentsTableBody = document.querySelector("#studentsTable tbody");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const searchInput = document.getElementById("search");

// ----- CRUD Functions -----
async function fetchStudents() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (err) {
    alert("JSON Server not running!");
    return [];
  }
}

async function createStudent(student) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return await res.json();
}

async function updateStudent(id, payload) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

async function deleteStudent(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
}

// ----- UI Helpers -----
function clearForm() {
  studentForm.reset();
  document.getElementById("studentId").value = "";
  submitBtn.textContent = "Save Student";
}

function fillFormForEdit(student) {
  document.getElementById("studentId").value = student.id;
  document.getElementById("name").value = student.name;
  document.getElementById("section").value = student.section;
  document.getElementById("maths").value = student.result.maths;
  document.getElementById("science").value = student.result.science;
  document.getElementById("english").value = student.result.english;

  submitBtn.textContent = "Update Student";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderStudentsList(students) {
  studentsTableBody.innerHTML = "";

  students.forEach((s) => {
    const total = s.result.maths + s.result.science + s.result.english;
    const avg = (total / 3).toFixed(2);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.section}</td>
      <td>${s.result.maths}</td>
      <td>${s.result.science}</td>
      <td>${s.result.english}</td>
      <td>${total}</td>
      <td>${avg}</td>
      <td>
        <button class="small-btn edit">Edit</button>
        <button class="small-btn delete">Delete</button>
      </td>
    `;

    tr.querySelector(".edit").addEventListener("click", () => fillFormForEdit(s));

    tr.querySelector(".delete").addEventListener("click", async () => {
      if (confirm("Delete this student?")) {
        await deleteStudent(s.id);
        loadAndRender();
      }
    });

    studentsTableBody.appendChild(tr);
  });
}

// ----- Events -----
studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("studentId").value;
  const name = document.getElementById("name").value.trim();
  const section = document.getElementById("section").value;
  const maths = document.getElementById("maths").value;
  const science = document.getElementById("science").value;
  const english = document.getElementById("english").value;

  const result = new Result(maths, science, english);
  const payload = { name, section, result };

  if (id) {
    await updateStudent(id, payload);
    alert("Student updated!");
  } else {
    await createStudent(payload);
    alert("Student added!");
  }

  clearForm();
  loadAndRender();
});

resetBtn.addEventListener("click", clearForm);

searchInput.addEventListener("input", () => loadAndRender(searchInput.value));

async function loadAndRender(filter = "") {
  const students = await fetchStudents();
  const f = filter.trim().toLowerCase();

  const filtered = students.filter((s) => {
    return (
      s.name.toLowerCase().includes(f) ||
      s.section.toLowerCase().includes(f)
    );
  });

  renderStudentsList(filtered);
}

loadAndRender();
