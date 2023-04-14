const yearOutputEl = document.querySelector(".year-output");
const monthOutputEl = document.querySelector(".months-output");
const dayOutputEl = document.querySelector(".days-output");
const labelsEl = document.querySelectorAll("label");

const WARNING_COLOR = "hsl(0, 100%, 67%)";
const BORDER_COLOR = "hsl(0, 0%, 94%)";
const LABEL_COLOR = "hsl(0, 1%, 44%)";

function startCalculation() {
  if (isFieldEmpty()) {
    console.log("field is empty!");
  }
}

function resetBorderAndLabelColors(dayInputEl, monthInputEl, yearInputEl) {
  // resets border color to default state
  dayInputEl.style.borderColor = BORDER_COLOR;
  monthInputEl.style.borderColor = BORDER_COLOR;
  yearInputEl.style.borderColor = BORDER_COLOR;

  // reset label color to default state
  labelsEl[0].style.color = LABEL_COLOR;
  labelsEl[1].style.color = LABEL_COLOR;
  labelsEl[2].style.color = LABEL_COLOR;
}

function addBorderAndLabelColors() {
  // accessing all the input elements
  const dayInputEl = document.getElementById("day");
  const monthInputEl = document.getElementById("month");
  const yearInputEl = document.getElementById("year");

  dayInputEl.style.borderColor = WARNING_COLOR;
  monthInputEl.style.borderColor = WARNING_COLOR;
  yearInputEl.style.borderColor = WARNING_COLOR;

  labelsEl.forEach((label) => (label.style.color = WARNING_COLOR));
}

function isFieldEmpty() {
  const dayInputEl = document.getElementById("day");
  const monthInputEl = document.getElementById("month");
  const yearInputEl = document.getElementById("year");

  resetBorderAndLabelColors(dayInputEl, monthInputEl, yearInputEl);

  // hiding all the error messages
  document.querySelector(".empty-d-error").classList.add("hide");
  document.querySelector(".empty-m-error").classList.add("hide");
  document.querySelector(".empty-y-error").classList.add("hide");

  if (dayInputEl.value === "") {
    dayInputEl.style.borderColor = WARNING_COLOR;
    labelsEl[0].style.color = WARNING_COLOR;
    document.querySelector(".empty-d-error").classList.remove("hide");
  }
  if (monthInputEl.value === "") {
    monthInputEl.style.borderColor = WARNING_COLOR;
    labelsEl[1].style.color = WARNING_COLOR;
    document.querySelector(".empty-m-error").classList.remove("hide");
  }
  if (yearInputEl.value === "") {
    yearInputEl.style.borderColor = WARNING_COLOR;
    labelsEl[2].style.color = WARNING_COLOR;
    document.querySelector(".empty-y-error").classList.remove("hide");
  }

  if (
    dayInputEl.value == "" ||
    monthInputEl.value == "" ||
    yearInputEl.value == ""
  ) {
    return true;
  }
  const fieldValid = isFieldValid(dayInputEl, monthInputEl, yearInputEl);
}

function isFieldValid(d, m, y) {
  let status = true;
  document.querySelector(".invalid-d-error").classList.add("hide");
  document.querySelector(".invalid-m-error").classList.add("hide");
  document.querySelector(".invalid-y-error").classList.add("hide");

  if (d.value > 31 || d.value < 1) {
    labelsEl[0].style.color = WARNING_COLOR;
    document.querySelector(".invalid-d-error").classList.remove("hide");
    status = false;
  }
  if (m.value > 12 || m.value < 1) {
    labelsEl[1].style.color = WARNING_COLOR;
    document.querySelector(".invalid-m-error").classList.remove("hide");
    status = false;
  }
  if (y.value < 1) {
    labelsEl[2].style.color = WARNING_COLOR;
    document.querySelector(".invalid-y-error").classList.remove("hide");
    status = false;
  }
  if (status) {
    validDate(d, m, y);
  }
  return status;
}

function validDate(d, m, y) {
  document.querySelector(".past-date-error").classList.add("hide");
  const currentYear = new Date().getFullYear();
  const invalid = Number(y.value) > currentYear ? true : false;
  console.log("invalid ", invalid);
  console.log("user input: ", Number(d.value));

  if (invalid) {
    addBorderAndLabelColors();
    document.querySelector(".past-date-error").classList.remove("hide");
    return false;
  }
  if (!invalid) {
    calculateDMY(d, m, y);
  }
  return true;
}

// calculates day, month and year
function calculateDMY(d, m, y) {
  const birthYear = Number(y.value);
  const birthMonth = Number(m.value);
  const birthDate = Number(d.value);
  const date = new Date();
  let currDate = date.getDate();
  let currYear = date.getFullYear();
  let currMonth = date.getMonth() + 1;

  let dateDiff = 0;
  let monthDiff = 0;
  let yearDiff = 0;

  if (currDate >= birthDate && currMonth >= birthMonth) {
    dateDiff = currDate - birthDate;
    monthDiff = currMonth - birthMonth;
    yearDiff = currYear - birthYear;
  }
  if (currDate - birthDate < 0) {
    currDate += 30;
    --currMonth;
  }
  if (currMonth - birthMonth < 0) {
    currMonth += 12;
    --currYear;
  }
  dateDiff = currDate - birthDate;
  monthDiff = currMonth - birthMonth;
  yearDiff = currYear - birthYear;

  dayOutputEl.textContent = dateDiff;
  monthOutputEl.textContent = monthDiff;
  yearOutputEl.textContent = yearDiff;
}

document
  .querySelector(".calc-result-btn")
  .addEventListener("click", startCalculation);
