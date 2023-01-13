"use strict";
const form = document.getElementById("contactForm");
const fname = document.getElementById("firstname");
const sname = document.getElementById("sname");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const getMessage = document.getElementById("sendmessage");
const listMessage = document.getElementById("List of message");
let Message = new Object();
let MessageArr = [];

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
    MessageArr.push(Message);
    window.localStorage.setItem(`Message`, JSON.stringify(MessageArr));

    fname.value = "";
    sname.value = "";
    subject.value = "";
    message.value = "";
  }
});
