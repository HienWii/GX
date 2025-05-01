import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from "./config.js";

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const nameValue = nameInput.value;
  const surnameValue = surnameInput.value;
  const emailValue = emailInput.value;
  const subjectValue = subjectInput.value;
  const messageValue = messageInput.value;
  await addDoc(collection(db, "Opinion"), {
    name: nameValue,
    surname: surnameValue,
    email: emailValue,
    subject: subjectValue,
    message: messageValue,
  });
  alert("Message sent successfully");
});
