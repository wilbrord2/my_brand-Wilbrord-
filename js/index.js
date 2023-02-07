"use strict";

const menuBtn = document.getElementById("menuBtn");
const menilist = document.getElementById("menulist");
const closeBtn = document.getElementById("closeBtn");
const Register = document.getElementById("Register");
const LoginBtn = document.getElementById("login");

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

async function loginguser(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log("error generated", error);
  }
}

LoginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let userEmail = document.getElementById("useremail").value;
  let userpassword = document.getElementById("userpassword").value;
  let userCredentials = {
    email: `${userEmail}`,
    password: `${userpassword}`,
  };
  let userToken = [];

  loginguser("http://localhost:3000/api/user/login", userCredentials)
    .then((data) => {
      Alloweduser(data);
    })
    .catch((error) => console.log(error));

  function Alloweduser(token) {
    if (token === "email or password does not exist" || token === "") {
      emailError.innerHTML = token;
      passwordError.innerHTML = token;
    } else if (userEmail === "" || userpassword === "") {
      validateEmail();
      validatePassword();
    } else if (token.length <= 80) {
      emailError.innerHTML = "check well your email and password";
      passwordError.innerHTML = "check well your email and password";
    } else {
      const myToken = {
        token: token,
      };
      console.log(myToken);
      userToken.push(token);
      window.localStorage.setItem("myToken", JSON.stringify(myToken));
      document.getElementById("useremail").value = "";
      document.getElementById("userpassword").value = "";
      window.location.href = "admin-page/dashboard.html";
    }
  }
});
