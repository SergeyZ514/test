"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // Form
  const form = document.querySelector(".contact__form");
  const inputs = form.querySelectorAll("input, textarea");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let emptyFields = false;

    inputs.forEach((element) => {
      element.classList.remove("invalid");

      if (element.value.trim() === "") {
        element.classList.add("invalid");
        emptyFields = true;
      }
    });

    if (!emptyFields) {
      alert("Форма отправлена");
      inputs.forEach((element) => (element.value = ""));
    }
  });

  // Cookie popup

  const cookie = document.querySelector(".cookie-popup");
  const cookieBtn = cookie.querySelector(".cookie-popup__button");

  cookieBtn.addEventListener("click", () => cookie.remove());

  setTimeout(function () {
    let i = 0;
    const interval = setInterval(function () {
      if (i === cookie.offsetHeight) {
        clearInterval(interval);
      }
      cookie.style.top =
        document.documentElement.clientHeight +
        document.body.scrollTop -
        i +
        "px";
      i++;
    }, 10);
  }, 1000);
});
