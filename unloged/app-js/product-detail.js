// const product = document.querySelector(".product-list-container");
// const querySnapshot = await getDocs(collection(db, "product"));
const URL = new URLSearchParams(window.location.search);
console.log(URL);
const productId = URL.get("id");
console.log(productId);
