"use strict";
const form = document.getElementById("contactForm");
const fname = document.getElementById("firstname");
const sname = document.getElementById("sname");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const getMessage = document.getElementById("sendmessage");
const listMessage = document.getElementById("List of message");
let Message = new Object();

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
      fname: fname.value,
      sname: sname.value,
      subject: subject.value,
      message: message.value,
    };

    console.log("My contact Message", Message);
    window.localStorage.setItem(`${Sname}`, JSON.stringify(Message));

    fname.value = "";
    sname.value = "";
    subject.value = "";
    message.value = "";
  }
});

// listing element from local storage
function test() {
  const userMessage = JSON.parse(localStorage.getItem("0780505303"));
  console.log(userMessage);
  console.log(userMessage.fname);
  for (const key in localStorage) {
    console.log(`${key}:`);
  }
}
//${localStorage.getItem(key)}
// listMessage.addEventListener("DOMContentLoaded", function () {
//   console.log("visible");
//   console.log(localStorage.getItem("0780505303"));
// });

// listMessage.onload = function () {
//   console.log(localStorage.getItem("0780505303"));
// };
