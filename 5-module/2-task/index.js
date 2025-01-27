function toggleText() {
  let textElement = document.getElementById("text");
  let button = document.querySelector(".toggle-text-button");

  button.addEventListener("click", function () {
    if (textElement.hidden === true) {
      textElement.hidden = false;
    } else {
      textElement.hidden = true;
    }
  });
}
