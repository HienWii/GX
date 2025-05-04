import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { db } from "./config.js";
import auth from "./config.js";
// Get ID from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

if (productId) {
  loadProductDetails(productId);
}

async function loadProductDetails(id) {
  const docRef = doc(db, "All games", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const product = docSnap.data();

    // Update HTML elements
    document.querySelector(
      ".page-heading .container .row .col-lg-12 h3"
    ).textContent = product.name;
    document.querySelector(
      ".page-heading .breadcrumb"
    ).innerHTML = `<a href="home-unloged.html">Home</a> > <a href="shop.html">Shop</a> > ${product.name}`;

    document.querySelector(".left-image img").src = product.image;
    document.querySelector(".left-image img").alt = product.name;

    document.querySelector(".col-lg-6.align-self-center h4").textContent =
      product.name;
    document.querySelector(".price").innerHTML = `$${product.price}`;
    document.querySelector(".col-lg-6.align-self-center p").textContent =
      product.description;

    const newLink = document.createElement("a");
    newLink.href = "#";
    newLink.textContent = "New Link Text"; // hoặc product.name nếu cần

    const genreLi = document.querySelector(".gerne li");
    if (genreLi) {
      genreLi.innerHTML = `
      <span>Genre:</span> 
      <a>${product.gerne1 || "N/A"}</a> ,
      <a>${product.gerne2 || "N/A"}</a> ,
      <a>${product.gerne3 || "N/A"}</a>
      `;
    }
  }
}

const addToCartBtn = document.querySelector(".add-to-cart");
const quantityInput = document.querySelector(".quantity");

addToCartBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const priceElement = document.querySelector(".price");
  const productName = document.querySelector(
    ".col-lg-6.align-self-center h4"
  ).textContent;
  const productImage = document.querySelector(".left-image img").src;
  const productPriceText = priceElement.textContent.trim();
  const quantity = parseInt(quantityInput.value) || 1;

  if (productPriceText === "$0") {
    alert("This product is free. You can download it directly.");
    // window.location.href = "download-link.html"; // nếu có
  } else {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      name: productName,
      image: productImage,
      price: productPriceText,
      quantity: quantity,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  }
});

function renderCart() {
  const cartItemsList = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("#cart-total");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsList.innerHTML = ""; // Xóa nội dung cũ

  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 30px; height: 30px; object-fit: cover; margin-right: 5px;" />
      <strong>${item.name}</strong> x${item.quantity} - ${item.price}
    `;
    cartItemsList.appendChild(li);

    // Tính tổng tiền (giá dạng chuỗi $XX, cần tách số)
    const priceNumber = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    total += priceNumber * item.quantity;
  });

  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  window;
}

// Gọi khi trang load
window.addEventListener("load", renderCart);

function toggleDropdown() {
  const dropdown = document.getElementById("cart-container");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

window.onclick = function (event) {
  if (!event.target.closest(".profile-container")) {
    document.getElementById("profileDropdown").style.display = "none";
  }
};
