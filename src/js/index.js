"use strict";
import "../sass/main.scss";
import jsonFile from "../data/data.json";

(function () {
  const btnDaily = document.querySelector(".btn-daily");
  const btnWeekly = document.querySelector(".btn-weekly");
  const btnMonthly = document.querySelector(".btn-monthly");

  const categories = [
    { title: "Work", parentEl: document.querySelector(".work") },
    { title: "Play", parentEl: document.querySelector(".play") },
    { title: "Study", parentEl: document.querySelector(".study") },
    { title: "Exercise", parentEl: document.querySelector(".exercise") },
    { title: "Social", parentEl: document.querySelector(".social") },
    { title: "Self Care", parentEl: document.querySelector(".self-care") },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch(jsonFile);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const renderOutput = (period, data, parentEl) => {
    const hours = parentEl.querySelector(".report__content__info__hours");
    const prevInfo = parentEl.querySelector(
      ".report__content__info__prev-info"
    );

    hours.textContent = `${data.current}hrs`;
    prevInfo.textContent = `${period} - ${data.previous}hrs`;
  };

  const handleData = async (status) => {
    try {
      const rawData = await fetchData();

      categories.forEach(({ title, parentEl }) => {
        const categoryData = rawData.find((entry) => entry.title === title);

        if (status === "daily") {
          renderOutput("Today", categoryData.timeframes.daily, parentEl);
        } else if (status === "weekly") {
          renderOutput("Last week", categoryData.timeframes.weekly, parentEl);
        } else if (status === "monthly") {
          renderOutput("Last month", categoryData.timeframes.monthly, parentEl);
        }
      });
    } catch (error) {
      console.error("Error handling data:", error);
      throw error;
    }
  };

  const setActiveButton = (selectedButton) => {
    [btnDaily, btnWeekly, btnMonthly].forEach((btn) => {
      btn.classList.remove("btn-active");
    });

    selectedButton.classList.add("btn-active");
  };

  btnDaily.addEventListener("click", function () {
    setActiveButton(this);
    handleData("daily");
  });

  btnWeekly.addEventListener("click", function () {
    setActiveButton(this);
    handleData("weekly");
  });

  btnMonthly.addEventListener("click", function () {
    setActiveButton(this);
    handleData("monthly");
  });
})();
