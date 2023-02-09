"use strict";
const form = document.getElementById("contactForm");
const fname = document.getElementById("firstname");
const sname = document.getElementById("sname");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const getMessage = document.getElementById("sendmessage");
const listMessage = document.getElementById("List of message");
const username = document.getElementById("user-name");
const adminname = document.getElementById("admin-name");
let Message = new Object();
let statusResult = "make sure you fill the form correctly.";

// CREATING A MESSAGE

async function sendmessage(url, data) {
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

getMessage.addEventListener("click", function (e) {
  e.preventDefault();
  const Fname = fname.value;
  const Sname = sname.value;
  const Subject = subject.value;
  const Mymessage = message.value;

  if (Fname.length <= 0) {
    fname.placeholder = "Fill this field  !!!";
    fname.classList.add("error");
    fname.addEventListener("keyup", function () {
      fname.classList.remove("error");
      return false;
    });
    return true;
  } else if (Sname.length <= 0) {
    sname.placeholder = "Fill this field  !!!";
    sname.classList.add("error");
    sname.addEventListener("keyup", function () {
      sname.classList.remove("error");
      return false;
    });
    return true;
  } else if (Subject.length <= 0) {
    subject.placeholder = "Fill this field  !!!";
    subject.classList.add("error");
    subject.addEventListener("keyup", function () {
      subject.classList.remove("error");
      return false;
    });
    return true;
  } else if (Mymessage.length <= 0) {
    message.placeholder = "Fill this field  !!!";
    message.classList.add("error");
    message.addEventListener("keyup", function () {
      message.classList.remove("error");
      return false;
    });
    return true;
  } else {
    Message = {
      name: fname.value,
      email: sname.value,
      subject: subject.value,
      message: message.value,
    };
    sendmessage(
      "https://wilbrord-mybrand-backend.up.railway.app/api/messages/save",
      Message
    )
      .then((data) => registerResult(data))
      .catch((err) => console.log(err.message));
    // MessageArr.push(Message);
    // window.localStorage.setItem(`Message`, JSON.stringify(MessageArr));

    fname.value = "";
    sname.value = "";
    subject.value = "";
    message.value = "";
  }
});

// MODEL

// Get the modal
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const okmodelbtn = document.getElementById("modelSignup");
let registerResult;
// When the user clicks the button, open the modal
getMessage.onclick = function () {
  modal.style.display = "block";
  registerResult = async (data) => {
    statusResult = await data;
    console.log(statusResult);
  };
  if (statusResult !== "Thank you for your feedback" || statusResult !== "") {
    document.getElementById("modelmessage").innerHTML = `${statusResult}`;
    okmodelbtn.onclick = function () {
      modal.style.display = "none";
    };
  } else {
    document.getElementById(
      "modelmessage"
    ).innerHTML = `Thank you for your feedback`;
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
