"use strict";

const menuBtn = document.getElementById("menuBtn");
const menilist = document.getElementById("menulist");
const closeBtn = document.getElementById("closeBtn");

menuBtn.addEventListener("click", function () {
  menilist.classList.remove("hidde");
  menilist.classList.add("navbarAnimation");
  //   console.log("remove hidden");
});
closeBtn.addEventListener("click", function () {
  menilist.classList.add("hidde");
  //   console.log("add hidde");
});
