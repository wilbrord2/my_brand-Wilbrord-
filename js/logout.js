const logoutbtn = document.getElementById("logout");

logoutbtn.addEventListener("click", () => {
    localStorage.removeItem("myToken");
    console.log("logged out successfully");
});
