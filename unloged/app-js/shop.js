    // Static items for demonstration purposes
    const items = []; // Sample list for pagination demonstration 

    const itemsPerPage = 4;
    let currentPageItems = 1; // Current page for static items
    const totalPagesItems = Math.ceil(items.length / itemsPerPage);

    // Render static items with pagination
    function renderItems() {
      const container = document.getElementById("itemContainer");
      container.innerHTML = ""; // Clear container before rendering new items

      const start = (currentPageItems - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedItems = items.slice(start, end);

      paginatedItems.forEach((item) => {
        const div = document.createElement("div");
        div.className = "col-lg-3 col-md-6 align-self-center mb-30 trending-items"; // Add responsive classes for styling
        div.innerHTML = `<div class="item">
                          <h4>${item}</h4>
                        </div>`; // Render item content
        container.appendChild(div);
      });
    }

    // Render pagination for static items
    function renderPaginationItems() {
      const controls = document.getElementById("paginationControls");
      controls.innerHTML = ""; // Clear previous pagination controls

      // Previous button for static items
      const prevLi = document.createElement("li");
      const prevLink = document.createElement("a");
      prevLink.href = "#";
      prevLink.innerHTML = "&lt;";
      prevLink.addEventListener("click", function (e) {
        e.preventDefault();
        if (currentPageItems > 1) {
          currentPageItems--;
          renderItems();
          renderPaginationItems();
        }
      });
      prevLi.appendChild(prevLink);
      controls.appendChild(prevLi);

      // Render page numbers for static items
      for (let i = 1; i <= totalPagesItems; i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = i;
        if (i === currentPageItems) {
          a.classList.add("is_active"); // Highlight current page
        }
        a.addEventListener("click", function (e) {
          e.preventDefault();
          currentPageItems = i;
          renderItems();
          renderPaginationItems();
        });
        li.appendChild(a);
        controls.appendChild(li);
      }

      // Next button for static items
      const nextLi = document.createElement("li");
      const nextLink = document.createElement("a");
      nextLink.href = "#";
      nextLink.innerHTML = "&gt;";
      nextLink.addEventListener("click", function (e) {
        e.preventDefault();
        if (currentPageItems < totalPagesItems) {
          currentPageItems++;
          renderItems();
          renderPaginationItems();
        }
      });
      nextLi.appendChild(nextLink);
      controls.appendChild(nextLi);
    }

    // Firebase Firestore Integration
    import {
      collection,
      getDocs,
    } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
    import { db } from "./config.js";

    const gamesContainer = document.getElementById("games-list");
    const gamesPaginationControls = document.getElementById("gamesPaginationControls");

    async function loadGames() {
      const loadGamesSnapshot = await getDocs(collection(db, "All games"));
      const games = [];

      loadGamesSnapshot.forEach((doc) => {
        games.push(doc.data()); // Collect all games data
      });

      const totalGamePages = Math.ceil(games.length / itemsPerPage);
      let currentPageGames = 1; // Current page for games

      // Render Firebase games with pagination
      function renderGameItems() {
        const start = (currentPageGames - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedGames = games.slice(start, end);

        gamesContainer.innerHTML = ""; // Clear container

        paginatedGames.forEach((game) => {
          gamesContainer.innerHTML += `
            <div class="col-lg-3 col-md-6 align-self-center mb-30 trending-items">
              <div class="item">
                <div class="thumb">
                  <a href="product-details.html"><img src="${game.image || 'default-image.jpg'}" alt="${game.name}"></a>
                  <span class="price">$${game.price || '0'}</span>
                </div>
                <div class="down-content">
                  <span class="category">${game.gerne1 || 'Unknown'}</span>
                  <h4>${game.name}</h4>
                  <a href="product-details.html"><i class="fa fa-shopping-bag"></i></a>
                </div>
              </div>
            </div>`;
        });
      }

      // Render pagination for Firebase games
      function renderPaginationGames() {
        gamesPaginationControls.innerHTML = ""; // Clear previous pagination controls

        // Previous button for games
        const prevLi = document.createElement("li");
        const prevLink = document.createElement("a");
        prevLink.href = "#";
        prevLink.innerHTML = "&lt;";
        prevLink.addEventListener("click", function (e) {
          e.preventDefault();
          if (currentPageGames > 1) {
            currentPageGames--;
            renderGameItems();
            renderPaginationGames();
          }
        });
        prevLi.appendChild(prevLink);
        gamesPaginationControls.appendChild(prevLi);

        // Render page numbers for games
        for (let i = 1; i <= totalGamePages; i++) {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = "#";
          a.textContent = i;
          if (i === currentPageGames) {
            a.classList.add("is_active"); // Highlight current page
          }
          a.addEventListener("click", function (e) {
            e.preventDefault();
            currentPageGames = i;
            renderGameItems();
            renderPaginationGames();
          });
          li.appendChild(a);
          gamesPaginationControls.appendChild(li);
        }

        // Next button for games
        const nextLi = document.createElement("li");
        const nextLink = document.createElement("a");
        nextLink.href = "#";
        nextLink.innerHTML = "&gt;";
        nextLink.addEventListener("click", function (e) {
          e.preventDefault();
          if (currentPageGames < totalGamePages) {
            currentPageGames++;
            renderGameItems();
            renderPaginationGames();
          }
        });
        nextLi.appendChild(nextLink);
        gamesPaginationControls.appendChild(nextLi);
      }

      // Initial render for game items and pagination
      renderGameItems();
      renderPaginationGames();
    }

    // Run initial rendering
    loadGames();
    renderItems(); // Render static items initially
    renderPaginationItems(); // Render pagination for static items