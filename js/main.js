const btns = document.querySelectorAll(".accordion-button");
const collapses = document.querySelectorAll(".collapse");
console.log(btns);

btns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

function handleClick(e) {
  const currTarget = e.currentTarget;

  const heading = currTarget.parentElement;
  const collapse = heading.nextElementSibling;

  closePrevFaq(collapse);

  if (collapse) {
    collapse.classList.toggle("show");
  }
}

function closePrevFaq(currCollapse) {
  const prevOpenedCollapse = document.querySelector(".collapse.show");
  if (prevOpenedCollapse && prevOpenedCollapse !== currCollapse) {
    prevOpenedCollapse.classList.remove("show");
  }
}
