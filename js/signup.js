const username = document.getElementById("userName");
const email = document.getElementById("useremail");
const password = document.getElementById("fPassword");
const repassword = document.getElementById("lPassword");
const RegisterBtn = document.getElementById("Register");
let repassError = document.getElementById("repassword-error");
let emailError = document.getElementById("email-error");
const nameError = document.getElementById("name-error");
const passError = document.getElementById("password-error");
let signupObj = new Object();
let statusResult = "make sure you fill the form correctly.";

// CREATING A USER

async function postData(url, data) {
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

RegisterBtn.addEventListener("click", function (e) {
  let name = username.value;
  let userEmail = email.value;
  let P1 = password.value;
  let reP1 = repassword.value;
  let passa = P1;
  let passb = reP1;

  if (
    name.length <= 0 &&
    userEmail.length <= 0 &&
    P1.length <= 0 &&
    reP1.length <= 0
  ) {
    username.classList.add("error");
    username.addEventListener("keyup", function () {
      username.classList.remove("error");
      return false;
    });
    email.classList.add("error");
    email.addEventListener("keyup", function () {
      email.classList.remove("error");
      return false;
    });

    password.classList.add("error");
    password.addEventListener("keyup", function () {
      password.classList.remove("error");
      return false;
    });

    repassword.classList.add("error");
    repassword.addEventListener("keyup", function () {
      repassword.classList.remove("error");
      return false;
    });
  } else if (!ValidateName() || !ValidatePassword() || !validateEmail()) {
    return false;
  } else if (passb.length == 0) {
    repassError.innerHTML = "Repeate password";
    return false;
  } else if (passa !== passb) {
    repassError.innerHTML = "Repeate password";
    return false;
  } else if (passa === passb) {
    signupObj = {
      name: `${username.value}`,
      email: `${email.value}`,
      password: `${password.value}`,
      repassword: `${repassword.value}`,
    };
    // signupArr.push(signupObj);
    // window.localStorage.setItem("Clients", JSON.stringify(signupArr));
    postData(
      "https://wilbrord-mybrand-backend.up.railway.app/api/user/createUser",
      signupObj
    )
      .then((data) => registerResult(data))
      .catch((err) => console.log(err.message));

    document.getElementById("userName").value = "";
    document.getElementById("useremail").value = "";
    document.getElementById("fPassword").value = "";
    document.getElementById("lPassword").value = "";

    return true;
  }
});

function ValidateName() {
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

// MODEL

// Get the modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("Register");
const span = document.getElementsByClassName("close")[0];
const okmodelbtn = document.getElementById("modelSignup");
let registerResult
// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  registerResult= async (data) => {
    statusResult = await data;
  };
  if (
    statusResult !== "email Already exist try onother one" ||
    statusResult !== ""
  ) {
    document.getElementById("message").innerHTML = `${statusResult}`;
    console.log(statusResult);
    okmodelbtn.onclick = function () {
      modal.style.display = "none";
    };
  } else {
    document.getElementById(
      "message"
    ).innerHTML = `${statusResult}`;
    console.log(statusResult);
    okmodelbtn.onclick = function () {
      window.location.href = "login.html";
    };
  }
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
