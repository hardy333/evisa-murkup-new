const burgerBtn = document.querySelector(".burger");
const navbarNavContainer = document.querySelector(".navbar__nav-container");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("opened");
  navbarNavContainer.classList.toggle("opened");
  if (burgerBtn.classList.contains("opened")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
