"use strict";

const getMessage = document.getElementById("sendmessage");
let Message = new Object();

getMessage.addEventListener("click", function () {
  const firstName = document.getElementById("fname").value;
  console.log(test);
  if (firstName == null || firstName == "") {
    document.querySelectorAll(".clear").textContent = "fill this field";
  } else {
    Message = {
      fname: document.getElementById("fname").value,
      sname: document.getElementById("sname").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
    console.log(test);
    console.log(Message);
    //   window.localStorage.setItem(`${firstName}`, JSON.stringify(Message));
  }
  document.querySelectorAll(".clear").textContent = "";
});

console.log(Message);
