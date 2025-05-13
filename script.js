const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

const form = document.querySelector("form");

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;
  inputs.forEach((input) => {
    const parent = input.parentElement;
    if (!input.value) {
      input.classList.add("error");
      parent.querySelector("small").innerText = "This field is required";
      validator = false;
    } else if (monthInp.value > 12) {
      monthInp.classList.add("error");
      parent.querySelector("small").innerText = "Must be a valid month";
      validator = false;
    } else if (dayInp.value > 31) {
      dayInp.classList.add("error");
      parent.querySelector("small").innerText = "Must be a valid day";
      validator = false;
    } else {
      input.classList.remove("error");
      parent.querySelector("small").innerText = "";
      validator = true;
    }
  });
  return validator;
}

function calculate() {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  if (validate()) {
    if (dayInp.value > day) {
      day += months[month - 1];
      month -= 1;
    }

    if (monthInp.value > month) {
      month += 12;
      year -= 1;
    }

    let days = day - dayInp.value;
    let monthDiff = month - monthInp.value;
    let yearDiff = year - yearInp.value;

    dayOtp.innerText = days;
    monthOtp.innerText = monthDiff;
    yearOtp.innerText = yearDiff;

    if (days < 0) {
      days += 30;
      monthDiff -= 1;
    }

    if (monthDiff < 0) {
      monthDiff += 12;
      yearDiff -= 1;
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  calculate();
});
