import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from "./config.js";

const trendingGames = document.querySelector("#trending-container");
const mostPlayedGames = document.querySelector("#most-played-container");
const categoriesGames = document.querySelector("#categories-container");
const loadTrendingSnapshot = await getDocs(collection(db, "Trending"));
const loadMostPlayedSnapshot = await getDocs(collection(db, "Most Played"));
const loadCategoriesSnapshot = await getDocs(collection(db, "Categories"));
loadTrendingSnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  trendingGames.innerHTML += `
            <div class="col-lg-3 col-md-6">
            <div class="item">
              <div class="thumb">
                  <img src="${doc.data().image}" alt=""</>
                <span class="price">
                ${doc.data().price}
                </span>
              </div>
              <div class="down-content">
                <span class="category">${doc.data().gerne1}</span>
                <h4>${doc.data().name}</h4>
                <button onclick="openModal()"><i class="fa fa-shopping-bag"></i></button>
              </div>
            </div>
          </div>
  `;
});
loadMostPlayedSnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  mostPlayedGames.innerHTML += `
            <div class="col-lg-3 col-md-6">
            <div class="item">
              <div class="thumb">
                  <img src="${doc.data().image}" alt=""/>
              </div>
              <div class="down-content">
                <span class="category">${doc.data().gerne1}</span>
                <h4>${doc.data().name}</h4>
                <button onclick="openModal()"><i class="fa fa-shopping-bag"></i></button>
              </div>
            </div>
          </div>
  `;
});
loadCategoriesSnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  categoriesGames.innerHTML += `
            <div class="col-lg col-sm-6 col-xs-12">
            <div class="item">
              <h4>${doc.data().gerne1}</h4>
              <div class="thumb">
          
                <button onclick="openModal()"><img src="${
                  doc.data().image
                }" alt=""/></button>
              </div>
            </div>
          </div>
  `;
});
