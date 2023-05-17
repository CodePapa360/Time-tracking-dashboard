"use strict";
import "../sass/main.scss";

const btnDaily = document.querySelector(".btn-daily");
const btnWeekly = document.querySelector(".btn-weekly");
const btnMonthly = document.querySelector(".btn-monthly");

const renderWork = function (data) {
  const parentEl = document.querySelector(".work");
  const hours = parentEl.querySelector(".report__content__info__hours");
  console.log(hours);
};

btnDaily.addEventListener("click", function () {
  [btnDaily, btnWeekly, btnMonthly].forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  this.classList.add("btn-active");

  renderWork();
});

btnWeekly.addEventListener("click", function () {
  [btnDaily, btnWeekly, btnMonthly].forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  this.classList.add("btn-active");
});

btnMonthly.addEventListener("click", function () {
  [btnDaily, btnWeekly, btnMonthly].forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  this.classList.add("btn-active");
});
