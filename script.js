// Fetch data from the API and manage pagination
const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

const recordsPerPage = 5;
let currentPage = 1;
let projects = [];

// DOM Elements
const tableBody = document.querySelector("#projectsTable tbody");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// Fetch data from API
async function fetchProjects() {
  try {
    const response = await fetch(API_URL);
    projects = await response.json();
    renderTable();
    updatePagination();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render table rows based on current page
function renderTable() {
  tableBody.innerHTML = ""; // Clear table content
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, projects.length);

  for (let i = startIndex; i < endIndex; i++) {
    const project = projects[i];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i}</td>
      <td>${Math.round(project["percentage.funded"])}</td>
      <td>${project["amt.pledged"]}</td>
    `;
    tableBody.appendChild(row);
  }
}

// Update pagination controls
function updatePagination() {
  const totalPages = Math.ceil(projects.length / recordsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Event Listeners for Pagination
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
    updatePagination();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(projects.length / recordsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderTable();
    updatePagination();
  }
});

// Initialize the app
fetchProjects();
