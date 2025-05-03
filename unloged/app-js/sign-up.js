import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import auth from "./config.js";

const emailInput = document.querySelector(".email-sign-up-input");
const passwordInput = document.querySelector(".password-sign-up-input");
const submitBtn = document.querySelector(".orange-button");
const emailError = document.querySelector(".email-notification");
const passwordError = document.querySelector(".password-notification");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const emailValue = emailInput.value.trim();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
  const passwordValue = passwordInput.value.trim();
  if (!passwordValue.match(passwordRegex)) {
    passwordError.textContent =
      "Password must be 8-15 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    passwordError.style.color = "red";
    passwordError.style.fontWeight = "bold"; // 'W' should be uppercase
  } else {
    passwordError.textContent = "";
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        alert("Sign up successful!");
        window.location.href = "./home-logged.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  }
});
