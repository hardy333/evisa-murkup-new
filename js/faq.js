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
    console.log(sccrollHeight, clientHeight);

    if (clientHeight > 0) {
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
