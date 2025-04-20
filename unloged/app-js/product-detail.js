// const product = document.querySelector(".product-list-container");
// const querySnapshot = await getDocs(collection(db, "product"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  product.innerHTML += `
  <div class="product">
    <h1">${doc.data().name || "No name given"}</h1>
    <h3>${doc.data().price || "No price given"}</h3>
    <label>${doc.data().description || "No idea given"}</label>
      <button class = "view-detail" data-id = "${doc.id}">View detail</button>
      <button class = "add-to-cart">Add to cart</button>
  </div>;
  `;
  const viewDetailBtn = document.querySelectorAll(".view-detail");
  viewDetailBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-id");
      window.location.href = `product.html?id=${productId}`;
    });
  });
});
