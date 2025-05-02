import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from "../unloged/app-js/config.js";
const productPrice = document.querySelector(".product-price");
const productName = document.querySelector(".product-name");
const description = document.querySelector(".description");
const gerne1 = document.querySelector(".gerne-1");
const gerne2 = document.querySelector(".gerne-2");
const gerne3 = document.querySelector(".gerne-3");
const image = document.querySelector(".image");
const addBtn = document.querySelector(".add-btn");

addBtn.addEventListener("click", async () => {
  const priceValue = productPrice.value;
  const nameValue = productName.value;
  const descriptionValue = description.value;
  const gerne1Value = gerne1.value;
  const gerne2Value = gerne2.value;
  const gerne3Value = gerne3.value;
  const imageValue = image.value;
  await addDoc(collection(db, "Categories"), {
    name: nameValue,
    price: priceValue,
    description: descriptionValue,
    gerne1: gerne1Value,
    gerne2: gerne2Value,
    gerne3: gerne3Value,
    image: imageValue,
  });
  alert("Sucessfully added");
  window.location.reload();
});
