"use strict";

const menuBtn = document.getElementById("menuBtn");
const menilist = document.getElementById("menulist");
const closeBtn = document.getElementById("closeBtn");
const Register = document.getElementById("Register");
menuBtn.addEventListener("click", function () {
  menilist.classList.remove("hidde");
  menilist.classList.add("navbarAnimation");
  //   console.log("remove hidden");
});
closeBtn.addEventListener("click", function () {
  menilist.classList.add("hidde");
  //   console.log("add hidde");
});

// Validation of login page

const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
function validateEmail() {
  let userEmail = document.getElementById("useremail").value;
  if (userEmail.length == 0) {
    emailError.style.color = "red";
    emailError.innerHTML = "Fill in your email";
    //console.log("error");
    return false;
  }
  if (!userEmail.match(/^[A-Za-z\._#&\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailError.style.color = "red";
    emailError.innerHTML = "Invalid email address";
    //console.log("error");
    return false;
  }
  emailError.style.color = "seagreen";
  emailError.innerHTML = "";
  return true;
}
function validatePassword() {
  let userpassword = document.getElementById("userpassword").value;
  if (userpassword.length == 0) {
    passwordError.style.color = "red";
    passwordError.innerHTML = "Fill in your password";
    return false;
  }
  if (userpassword.length < 6) {
    passwordError.style.color = "red";
    passwordError.innerHTML = "too Short";
    return false;
  }
  if (userpassword.length >= 15) {
    passwordError.style.color = "red";
    passwordError.innerHTML = "too high";
    return false;
  }
  passwordError.style.color = "seagreen";
  passwordError.innerHTML = "";
  return true;
}
const LoginBtn = document.getElementById("login");
LoginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let userEmail = document.getElementById("useremail").value;
  let userpassword = document.getElementById("userpassword").value;
  if (userEmail === "" && userpassword === "") {
    validateEmail();
    validatePassword();
  } else if (userEmail == "admin@gmail.com" && userpassword == "wilbrord@2") {
    window.location.href = "/admin-page/dashboard.html";
  } else if (userEmail != "admin@gmail.com" || userpassword == "wilbrord@2") {
    emailError.innerHTML = "Incorrect email";
    validatePassword();
  } else if (userEmail == "admin@gmail.com" || userpassword != "wilbrord@2") {
    passwordError.innerHTML = "Incorrect password";
    validateEmail();
  } else if (userEmail != "admin@gmail.com" || userpassword != "wilbrord@2") {
    emailError.innerHTML = "Incorrect email";
    passwordError.innerHTML = "Incorrect password";
  }
  document.getElementById("useremail").value = "";
  document.getElementById("userpassword").value = "";
});
