// JavaScript для маленьких экранов
let navbarToggler = document.querySelector(".navbar-toggler");
let navbarCollapse = document.querySelector(".navbar-collapse");

navbarToggler.addEventListener("click", function () {
  navbarCollapse.classList.toggle("collapsed");
});


