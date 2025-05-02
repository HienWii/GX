import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from "./config.js";

// Get ID from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

if (productId) {
  loadProductDetails(productId);
} else {
  alert("No product ID provided in URL.");
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

    const genreLinks = document.querySelectorAll("li span + a");
    if (genreLinks.length >= 3) {
      genreLinks[0].textContent = product.gerne1 || "N/A";
      genreLinks[1].textContent = product.gerne2 || "N/A";
      genreLinks[2].textContent = product.gerne3 || "N/A";
    }
  }
}
