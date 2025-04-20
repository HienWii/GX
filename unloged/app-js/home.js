import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from "./config.js";

const trendingGames = document.querySelector("#trending-container");
const querySnapshot = await getDocs(collection(db, "Trending"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  trendingGames.innerHTML += `
            <div class="col-lg-3 col-md-6">
            <div class="item">
              <div class="thumb">
                <a href="product-details.html"
                  ><img src="${doc.data().image}" alt=""
                /></a>
                <span class="price">
                <em>${doc.data().price}</em>
                ${doc.data().sale}</span>
              </div>
              <div class="down-content">
                <span class="category">${doc.data().category}</span>
                <h4>${doc.data().name}</h4>
                <a href="product-details.html"
                  ><i class="fa fa-shopping-bag"></i
                ></a>
              </div>
            </div>
          </div>
       
  `;
});
