import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import auth from "./config.js";

const emailInput = document.querySelector(".email-log-in-input");
const passwordInput = document.querySelector(".password-log-in-input");
const submitBtn = document.querySelector(".orange-button");
const emailError = document.querySelector(".email-notification");
const passwordError = document.querySelector(".password-notification");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
      // Signed in
      alert("Sign up successful!");
      // Signed in
      window.location.href = "./home-logged.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
