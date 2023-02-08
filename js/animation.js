// select all elements with class "animated-element"
const elements = document.querySelectorAll(".animated-element");

// listen for the scroll event
window.addEventListener("scroll", function () {
  elements.forEach((element) => {
    // calculate the distance from the top of the window to the top of the element
    let distanceFromTop = element.getBoundingClientRect().top;

    // if the distance from the top is less than the height of the window, add the "visible" class to the element
    if (distanceFromTop < window.innerHeight) {
      element.classList.add("visible");
    } else {
      element.classList.remove("visible");
    }
  });
});
