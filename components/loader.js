function terminateLoader() {
  document.getElementById("loader").style.display = "none";
}

function loadResponse() {

  terminateLoader();
}

// call loadResponse when the page loads
window.onload = loadResponse;
