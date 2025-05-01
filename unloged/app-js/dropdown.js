  function toggleDropdown() {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  }

  window.onclick = function(event) {
    if (!event.target.closest('.profile-container')) {
      document.getElementById("profileDropdown").style.display = "none";
    }
  };
