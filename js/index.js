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
});

//validation of sign-up

function ValidateName() {
  const nameError = document.getElementById("name-error");
  let fullname = document.getElementById("userName").value;

  if (fullname.length == 0) {
    nameError.innerHTML = "fill in your name";
    return false;
  }
  if (!fullname.match(/^[A-Za-z]*\s{1}[A-za-z]*$/)) {
    nameError.innerHTML = "write full name";
    return false;
  }
  nameError.innerHTML = "";
  return true;
}

function ValidatePassword() {
  const passError = document.getElementById("password-error");
  let passa = document.getElementById("fPassword").value;

  if (passa.length == 0) {
    passError.innerHTML = "fill in password";
    return false;
  }

  if (passa.length < 6) {
    passError.innerHTML = "Too short enter between 6-25";
    return false;
  }
  if (passa.length > 25) {
    passError.innerHTML = "Too high";
    return false;
  }
  passError.innerHTML = "";

  return true;
}

function submit() {
  const repassError = document.getElementById("repassword-error");
  let passa = document.getElementById("fPassword").value;
  let passb = document.getElementById("lPassword").value;

  if (!ValidateName() || !ValidatePassword() || !validateEmail()) {
    return false;
  }
  if (passb.length == 0) {
    repassError.innerHTML = "Repeate password";
  }
  if (passa === passb) {
    window.location.href = "login.html";
  } else {
    repassError.innerHTML = "Repeate password";
  }
}
