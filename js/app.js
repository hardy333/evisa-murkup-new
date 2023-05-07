// $(".slick-carousel").slick({
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: false,
//   arrows: true,
//   dots: true,
//   // adaptiveHeight: true,
// });

const steps = document.querySelectorAll(".app-step");
const formHeading = document.querySelector("#app-form-heading");

let currStepindex = 0;

const stepHeadings = [
  "Natinality info",
  "Trip duration",
  "Personal Info",
  "Pricing",
];

const appSlider = $(".app-form-carousel");

appSlider.slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
  dots: false,
  speed: 800,
  draggable: false,
  adaptiveHeight: true,
});

$(".app-form-btn-prev").click(() => {
  appSlider.slick("slickPrev");
  currStepindex--;
  updateSteps();
});

$(".app-form-btn-next").click(() => {
  appSlider.slick("slickNext");
  currStepindex++;
  updateSteps();
});

function updateSteps() {
  window.scrollTo(0, 200);

  formHeading.innerHTML = stepHeadings[currStepindex];

  steps.forEach((step, index) => {
    if (index <= currStepindex) {
      step.classList.add("app-step--completed");
    } else {
      step.classList.remove("app-step--completed");
    }
  });
}

updateSteps();
let x;

document.addEventListener("DOMContentLoaded", () => {
  x = document.querySelector("input[type='radio']");
  x.click();
});

setTimeout(function () {
  $("input[type='radio']").attr("checked", "checked");
}, 1000);

const radio = document.getElementById("24-hours");

radio.addEventListener("click", () => {
  console.log("change");
});

console.log(radio);

setTimeout(function () {
  radio.click();
}, 1000);
