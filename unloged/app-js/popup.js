function openModal() {
  document.getElementById("authModal").style.display = "block";
  showForm("signIn");
}

function closeModal() {
  document.getElementById("authModal").style.display = "none";
}
// Close when clicking outside the modal
window.addEventListener("click", function (event) {
  const modal = document.getElementById("authModal");
  if (event.target == modal) {
    closeModal();
  }
});
