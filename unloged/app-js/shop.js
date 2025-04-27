//Pagination
const items = []; // Tạo danh sách mẫu
for (let i = 1; i <= 20; i++) {
  items.push(`Item ${i}`);
}

const itemsPerPage = 4;
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
    div.className =
      "col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6"; // thêm class col-12 cho đẹp
    container.appendChild(div);
  });
}

function renderPagination() {
  const controls = document.getElementById("paginationControls");
  controls.innerHTML = "";

  // Nút Previous
  const prevLi = document.createElement("li");
  const prevLink = document.createElement("a");
  prevLink.href = "#";
  prevLink.innerHTML = "&lt;";
  prevLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderItems();
      renderPagination();
    }
  });
  prevLi.appendChild(prevLink);
  controls.appendChild(prevLi);

  // Các số trang
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i;
    if (i === currentPage) {
      a.classList.add("is_active"); // active trang hiện tại
    }
    a.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = i;
      renderItems();
      renderPagination();
    });
    li.appendChild(a);
    controls.appendChild(li);
  }

  // Nút Next
  const nextLi = document.createElement("li");
  const nextLink = document.createElement("a");
  nextLink.href = "#";
  nextLink.innerHTML = "&gt;";
  nextLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderItems();
      renderPagination();
    }
  });
  nextLi.appendChild(nextLink);
  controls.appendChild(nextLi);
}

// Khởi tạo
renderItems();
renderPagination();

//Firebase Database
import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from "./config.js";
