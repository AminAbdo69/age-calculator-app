const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");
const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");
const form = document.querySelector("form");

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;

  inputs.forEach((input) => {
    input.classList.remove("error");
    input.parentElement.querySelector("small").innerText = "";
  });

  inputs.forEach((input) => {
    const parent = input.parentElement;
    if (!input.value) {
      input.classList.add("error");
      parent.querySelector("small").innerText = "This field is required";
      validator = false;
    }
  });

  if (!validator) return false;

  const currentYear = new Date().getFullYear();

  if (yearInp.value.length !== 4) {
    yearInp.classList.add("error");
    yearInp.parentElement.querySelector("small").innerText =
      "Must be a valid year with 4 digits";
    validator = false;
  }

  if (yearInp.value > currentYear) {
    yearInp.classList.add("error");
    yearInp.parentElement.querySelector("small").innerText =
      "Must be in the past";
    validator = false;
  }

  if (monthInp.value < 1 || monthInp.value > 12) {
    monthInp.classList.add("error");
    monthInp.parentElement.querySelector("small").innerText =
      "Must be a valid month";
    validator = false;
  }

  if (validator && monthInp.value) {
    const daysInMonth = getDaysInMonth(monthInp.value, yearInp.value);
    if (dayInp.value < 1 || dayInp.value > daysInMonth) {
      dayInp.classList.add("error");
      dayInp.parentElement.querySelector("small").innerText =
        "Must be a valid day";
      validator = false;
    }
  }
  return validator;
}

function calculate() {
  if (!validate()) return;

  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let birthDay = parseInt(dayInp.value);
  let birthMonth = parseInt(monthInp.value);
  let birthYear = parseInt(yearInp.value);

  let yearDiff = year - birthYear;

  let monthDiff = month - birthMonth;
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }
  let dayDiff = day - birthDay;
  if (dayDiff < 0) {
    monthDiff--;
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    const prevMonth = month - 1 === 0 ? 12 : month - 1;
    const prevMonthYear = prevMonth === 12 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);
    dayDiff += daysInPrevMonth;
  }

  dayOtp.innerText = dayDiff;
  monthOtp.innerText = monthDiff;
  yearOtp.innerText = yearDiff;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  calculate();
});
