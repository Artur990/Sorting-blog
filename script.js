import * as helper from "./helper.js";

const $button = document.getElementById("sort-button");
const $startData = document.getElementById("start-date");
const $endData = document.getElementById("end-date");
const $filterbutton = document.getElementById("filter-button");
const $dropdownBtn = document.getElementById("category-button");
const $dropdownMenu = document.getElementById("dropdown");
const $toggleArrow = document.getElementById("category-arrow");

//function that fetches data and displays items
const getData = async (param, param2) => {
  const res = await fetch("data.json");
  const data = await res.json();
  if (param === "asce") {
    return helper.sortByDateAscending(data);
  }
  if (param === "decs") {
    return helper.sortByDateDescending(data);
  }
  if (param === "rangeDate") {
    return helper.filterBlogPostsByDate($startData.value, $endData.value, data);
  }
  if (param === "category") {
    return helper.filterBlogPostsByCategory(param2, data);
  }
  helper.addCategory(data);
  helper.addCard(data);
  // selecting a category from the drop-down menu
  document
    .querySelectorAll(".nav__category-dropdown div")
    .forEach((element) => {
      element.addEventListener("click", () => {
        getData("category", element.innerHTML.trim());
      });
    });
};

// toggle button to sort the date
let isOldest = true;
$button.addEventListener("click", () => {
  isOldest = !isOldest;
  $button.textContent = isOldest ? "Ascending" : "Descending";
  $button.textContent === "Ascending" && getData("asc");
  $button.textContent === "Descending" && getData("decs");
});

// date range selection
$filterbutton.addEventListener("click", () => {
  getData("rangeDate");
});

// toggle dropdown
const toggleDropdown = () => {
  $dropdownMenu.classList.toggle("show");
  $toggleArrow.classList.toggle("category-arrow");
};

// toggle dropdown open/close when dropdown button is clicked
$dropdownBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  toggleDropdown();
});

// close dropdown when dom element is clicked
document.documentElement.addEventListener("click", () => {
  if ($dropdownMenu.classList.contains("show")) {
    toggleDropdown();
  }
});

// selecting a category from the drop-down menu
document.querySelectorAll(".nav__category-dropdown div").forEach((element) => {
  element.addEventListener("click", () => {
    getData("category", element.innerHTML.trim());
  });
});

getData();
