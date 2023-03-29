const btns = document.querySelectorAll(".accordion-button");
const collapses = document.querySelectorAll(".collapse");

btns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

function handleClick(e) {
  const currTarget = e.currentTarget;

  const heading = currTarget.parentElement;
  const collapse = heading.nextElementSibling;

  closePrevFaq(collapse, currTarget);

  currTarget.classList.toggle("accordion-button--active");

  if (collapse) {
    const sccrollHeight = collapse.scrollHeight;
    const clientHeight = collapse.clientHeight;
    console.log(sccrollHeight);

    if (sccrollHeight === clientHeight) {
      collapse.style.height = 0 + "px";
    } else {
      collapse.style.height = sccrollHeight + "px";
    }
  }
}

// handling previously opened accordion item deactivation.
function closePrevFaq(currCollapse, currButton) {
  const prevButton = document.querySelector(".accordion-button--active");
  if (!prevButton) return;
  const accordionHeding = prevButton.parentElement;
  const prevOpenedCollapse = accordionHeding.nextElementSibling;

  // closing collapse
  if (prevOpenedCollapse && prevOpenedCollapse !== currCollapse) {
    prevOpenedCollapse.style.height = "0px";
  }

  // rotating arrow
  if (prevButton && prevButton !== currButton) {
    prevButton.classList.remove("accordion-button--active");
  }
}

window.addEventListener("load", () => {
  const activeFaqButton = document.querySelector(".accordion-button--active");
  if (activeFaqButton) {
    const accordionHeding = activeFaqButton.parentElement;
    const collapse = accordionHeding.nextElementSibling;
    const sccrollHeight = collapse.scrollHeight;
    console.log(sccrollHeight);

    collapse.style.height = sccrollHeight + "px";
  }
});
document.addEventListener("DOMContentLoaded", () => {});
