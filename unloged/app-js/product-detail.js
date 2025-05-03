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

// const addToCartButton = document.querySelector(".add-to-cart");
// const quantityInput = document.querySelector("#quantity");
// const cartItemsList = document.querySelector("#cart-items");
// const cartTotal = document.querySelector("#cart-total");

// // Product details (you should dynamically fetch these from the page)
// const productTitle = document.querySelector("h4").innerText; // Product title
// const productPrice = parseFloat(
//   document.querySelector(".price").innerText.replace("$", "")
// ); // Product price
// const productImage = document.querySelector(".left-image img").src; // Product image URL
// // Function to update the cart UI
// function updateCartUI() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cartItemsList.innerHTML = ""; // Clear existing cart items

//   let total = 0;

//   cart.forEach((item) => {
//     const cartItem = document.createElement("li");
//     cartItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity}`;
//     cartItemsList.appendChild(cartItem);

//     total += item.price * item.quantity;
//   });

//   // Update the cart total
//   cartTotal.innerText = `Total: $${total.toFixed(2)}`;
// }

// // Function to add product to cart
// function addToCart() {
//   const quantity = parseInt(quantityInput.value) || 1; // Get quantity, default to 1 if invalid
//   const product = {
//     name: productTitle,
//     price: productPrice,
//     image: productImage,
//     quantity: quantity,
//   };

//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   const existingProductIndex = cart.findIndex((item) => item.id === product.id);

//   if (existingProductIndex !== -1) {
//     // Update quantity if the product already exists in the cart
//     cart[existingProductIndex].quantity += quantity;
//   } else {
//     // Add the new product to the cart
//     cart.push(product);
//   }

//   // Save the updated cart to localStorage
//   localStorage.setItem("cart", JSON.stringify(cart));
//   console.log(localStorage.getItem("cart"));

//   // Update the UI to reflect the cart changes
//   updateCartUI();

//   // Optionally, display a message to the user
//   alert(`${product.name} has been added to your cart.`);
// }

// // Event listener for the "Add to Cart" button
// addToCartButton.addEventListener("click", function (event) {
//   event.preventDefault(); // Prevent the form from submitting
//   addToCart(); // Call the add to cart function
// });

// // Initial call to update cart UI on page load
// updateCartUI();
