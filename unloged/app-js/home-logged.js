import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { db } from "./config.js";
import auth from "./config.js";
// Show games data from Firebase Firestore

const trendingGames = document.querySelector("#trending-container");
const mostPlayedGames = document.querySelector("#most-played-container");
const categoriesGames = document.querySelector("#categories-container");
const loadTrendingSnapshot = await getDocs(collection(db, "Trending"));
const loadMostPlayedSnapshot = await getDocs(collection(db, "Most Played"));
const loadCategoriesSnapshot = await getDocs(collection(db, "Categories"));
loadTrendingSnapshot.forEach((doc) => {
  console.log(`${doc.id}`);
  trendingGames.innerHTML += `
            <div class="col-lg-3 col-md-6">
            <div class="item">
              <div class="thumb">
                  <img src="${doc.data().image}" alt=""/>
                <span class="price">
                ${doc.data().price}
                </span>
              </div>
              <div class="down-content">
                <span class="category">${doc.data().gerne1}</span>
                <h4>${doc.data().name}</h4>
                
              </div>
            </div>
          </div>
  `;
});
loadMostPlayedSnapshot.forEach((doc) => {
  console.log(`${doc.id}`);
  mostPlayedGames.innerHTML += `
            <div class="col-lg-3 col-md-6">
            <div class="item">
              <div class="thumb">
                  <img src="${doc.data().image}" alt=""/>
              </div>
              <div class="down-content">
                <span class="category">${doc.data().gerne1}</span>
                <h4>${doc.data().name}</h4>
                
              </div>
            </div>
          </div>
  `;
  const viewDetailBtns = document.querySelectorAll(".buy-btn");
  viewDetailBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.currentTarget.getAttribute("data-id");
      window.location.href = `product-details.html?id=${productId}`;
    });
  });
});
loadCategoriesSnapshot.forEach((doc) => {
  console.log(`${doc.id}`);
  categoriesGames.innerHTML += `
            <div class="col-lg col-sm-6 col-xs-12">
            <div class="item">
              <h4>${doc.data().gerne1}</h4>
              <div class="thumb">
                <img src="${doc.data().image}" alt=""/>
              </div>
            </div>
          </div>
  `;
});

// Show user data from Firebase Auth
const userData = document.querySelector("#user-info");
onAuthStateChanged(auth, (user) => {
  if (user) {
    userData.textContent = `${user.email} `;
  } else {
    window.location.href = "./log-in.html";
  }
});

function toggleDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

window.onclick = function (event) {
  if (!event.target.closest(".profile-container")) {
    document.getElementById("profileDropdown").style.display = "none";
  }
};

