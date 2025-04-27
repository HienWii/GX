const items = []; // Tạo dữ liệu giả
for (let i = 1; i <= 50; i++) {
  items.push(`Item ${i}`);
}

const itemsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(items.length / itemsPerPage);

function renderItems() {
  const container = document.getElementById("itemContainer");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = items.slice(start, end);

  paginatedItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = item;
    container.appendChild(div);
  });
}

function renderPagination() {
  const controls = document.getElementById("paginationControls");
  controls.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) {
      btn.disabled = true;
    }
    btn.addEventListener("click", function () {
      currentPage = i;
      renderItems();
      renderPagination();
    });
    controls.appendChild(btn);
  }
}

// Khởi tạo lần đầu
renderItems();
renderPagination();
