const logoutbtn = document.getElementById("logout");

logoutbtn.addEventListener("click", () => {
  localStorage.removeItem("myToken");
  //   console.log("logged out successfully");
});

window.onpopstate = function (event) {
  localStorage.removeItem("myToken");
  //   console.log("logged out successfully");
};
