const profileBtns = document.querySelectorAll(".profile-btn");
const applicationsSection = document.querySelector(
  ".profile-applications-section"
);
const settingsSection = document.querySelector(".profile-settings-section");

profileBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    profileBtns.forEach((btn) => btn.classList.remove("profile-btn--active"));

    btn.classList.add("profile-btn--active");

    if (btn.classList.contains("btn--settings")) {
      settingsSection.style.display = "block";
      applicationsSection.style.display = "none";
    } else {
      settingsSection.style.display = "none";
      applicationsSection.style.display = "block";
    }
  });
});
