const applicant = document.querySelector(".applicant");
const applicantsCollection = document.getElementsByClassName("applicant");
const applicants = document.querySelector(".applicants");
const addApplicantBtn = document.querySelector(".add-applicant");
const removeApplicantBtn = document.querySelector(".remove-applicant");
const applicantNum = document.querySelector(".applicant-num");
const submitBtn = document.getElementById("submitBtn");
let lastApplicantNum = 1;

const generateApplicantsJson = (collection) => {
  let array = Array.from(collection);
  let fieldsArr = [];

  array.forEach((item) => {
    Array.from(item.querySelectorAll(".form-control")).forEach((field) => {
      fieldsArr.push({
        id: item.getAttribute("data-id"),
        name: field.name,
        value: field.value,
      });
    });
  });

  let results = fieldsArr.reduce(function (results, applicant) {
    (results[applicant.id] = results[applicant.id] || []).push(applicant);
    return results;
  }, {});

  document.getElementById("applicantsJson").value = JSON.stringify(results);

  document.getElementById("appForm").submit();
};

const isValidEmail = (str) => {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(str);
};

const validate = (fields) => {
  let errors = {};
  $(".error-message").remove();
  $("#check-email-error").html("");

  for (i = 0; i < fields.length; i++) {
    if (fields[i].value === "") {
      errors[fields[i].name] = `${fields[i].name} is required.`;
      $(fields[i])
        .parent()
        .append(`<span class="error-message">${errors[fields[i].name]}</span>`);
    }

    if (
      fields[i].type === "email" &&
      fields[i].value !== "" &&
      !isValidEmail(fields[i].value)
    ) {
      errors[fields[i].name] = `Please enter valid email.`;
      $(fields[i])
        .parent()
        .append(`<span class="error-message">${errors[fields[i].name]}</span>`);
    }
  }

  return Object.keys(errors).length ? false : true;
};

const checkEmail = async (email) => {
  const response = await fetch(`user-helper/emailExist?email=${email}`);
  const res = await response.json();
  return res;
};

const showNextStep = (currentSlideIndex, slider) => {
  slider.slick("slickNext");

  $(".progress .step:eq(" + (currentSlideIndex + 1) + ")").addClass("active");
  $(".btn-prev").css("display", "block");

  if (currentSlideIndex === 2) {
    $(".btn-next").css("display", "none");
    $(".btn-submit").css("display", "block");
  }
};

$(document).ready(function () {
  $(".faq-list .item-header").click(function () {
    $(this).parent().toggleClass("opened");
  });

  const appSlider = $(".app-slider");

  $(".selector").select2();

  $(".dest-slider").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow:
      "<button type='button' class='slick-prev'><img src='./images/slick-prev-arrow.svg'/></button>",
    nextArrow:
      "<button type='button' class='slick-next'><img src='./images/slick-next-arrow.svg'/></button>",
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 411,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  });

  $(".btn-next").click(() => {
    const requiredFields = $(".slick-active .form-control[required]");
    const currentSlideIndex = Number(
      $(".slick-active").attr("data-slick-index")
    );

    if (!validate(requiredFields)) {
      appSlider.slick("refresh");
      return;
    }

    if (currentSlideIndex === 0) {
      const email = document.getElementById("check-email").value;
      checkEmail(email)
        .then((res) => {
          if (res) {
            $("#check-email-error").html("Email already exists.");
            return;
          }

          showNextStep(currentSlideIndex, appSlider);
        })
        .catch((err) => {
          if (err) {
            $("#check-email-error").html(
              "Something went wrong while email checking..."
            );
          }
        });
    } else {
      showNextStep(currentSlideIndex, appSlider);
    }
  });

  $(".btn-prev").click(() => {
    appSlider.slick("slickPrev");

    const prevSlideIndex = $(".slick-active").attr("data-slick-index");

    $(".progress .step:eq(" + (Number(prevSlideIndex) + 1) + ")").removeClass(
      "active"
    );

    if (prevSlideIndex === "0") {
      $(".btn-prev").css("display", "none");
    }

    if (prevSlideIndex < "3") {
      $(".btn-next").css("display", "block").html("Continue");
    }

    if (prevSlideIndex !== "4") {
      $(".btn-submit").css("display", "none");
      $(".btn-next").css("display", "block");
    }
  });

  appSlider.slick({
    slidesToShow: 1,
    infinite: false,
    adaptiveHeight: true,
    arrows: false,
    draggable: false,
  });

  addApplicantBtn.addEventListener("click", () => {
    let clonedApplicant = applicant.cloneNode(true);
    let fields = clonedApplicant.getElementsByClassName("form-control");

    lastApplicantNum++;

    clonedApplicant.setAttribute("data-id", lastApplicantNum);

    clonedApplicant
      .querySelector(".applicant-num")
      .querySelector("span").innerHTML = lastApplicantNum;

    Array.from(fields).forEach((el) => {
      el.name = `applicant.${lastApplicantNum}.${el.name}`;
      el.id = `applicant.${lastApplicantNum}.${el.id}`;
      el.value = "";
    });

    applicants.append(clonedApplicant);

    appSlider.slick("refresh");
  });

  document.addEventListener("click", (e) => {
    const target = e.target.closest(".remove-applicant");

    if (target) {
      target.closest(".applicant").remove();
      const applicantsArr = document.querySelectorAll(".applicant");
      const lastApplicant = applicantsArr[applicantsArr.length - 1];

      if (lastApplicantNum > applicantsArr.length) {
        lastApplicantNum = applicantsArr.length;
        lastApplicant
          .querySelector(".applicant-num")
          .querySelector("span").innerHTML = lastApplicantNum;
      } else {
        lastApplicantNum--;
      }

      appSlider.slick("refresh");
    }
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    generateApplicantsJson(applicantsCollection);
  });
});