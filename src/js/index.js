"use strict";
import "../sass/main.scss";
import rawJson from "../json/data.json";

const btnDaily = document.querySelector(".btn-daily");
const btnWeekly = document.querySelector(".btn-weekly");
const btnMonthly = document.querySelector(".btn-monthly");

//Render output
const renderOutput = function (data, parentEl) {
  const hours = parentEl.querySelector(".report__content__info__hours");
  const prevInfo = parentEl.querySelector(".report__content__prev-info");

  hours.textContent = data.currentHrs;
  prevInfo.textContent = `${data.period} - ${data.previousHrs}hrs`;
};

const renderData = function (receivedData) {
  const workParentEl = document.querySelector(".work");
  const playParentEl = document.querySelector(".play");
  const studyParentEl = document.querySelector(".study");
  const exerciseParentEl = document.querySelector(".exercise");
  const socialParentEl = document.querySelector(".social");
  const selfcareParentEl = document.querySelector(".self-care");

  renderOutput(receivedData.work, workParentEl);
};

const handleData = async function (status) {
  try {
    const rawData = await fetch(rawJson).then((res) => res.json());

    console.log(rawData);

    const readyData = {
      work: {
        daily: {
          currentHrs: null,
          previousHrs: null,
          period: "Today",
        },
      },
      play: {
        currentHrs: null,
        previousHrs: null,
        period: "Today",
      },
    };

    if (status === "daily") {
      renderData(readyData);
    }

    return renderData(readyData);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

btnDaily.addEventListener("click", function () {
  [btnDaily, btnWeekly, btnMonthly].forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  this.classList.add("btn-active");

  handleData("daily");
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
