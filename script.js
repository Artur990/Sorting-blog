import * as helper from "./helper.js";

const $button = document.getElementById("sort-button");
const $startData = document.getElementById("start-date");
const $endData = document.getElementById("end-date");
const $filterbutton = document.getElementById("filter-button");
const $dropdownBtn = document.getElementById("category-button");
const $dropdownMenu = document.getElementById("dropdown");
const $toggleArrow = document.getElementById("category-arrow");

// filtration object
let currentFilters = {
  sortBy: "date",
  sortOrder: "asc",
  category: "",
  fromDate: null,
  toDate: null,
};

// function that fetches data and displays items
const getData = async () => {
  const res = await fetch("data.json");
  const data = await res.json();
  let filteredPosts = data;

  // setting fetches data to the screen
  helper.addCategory(filteredPosts);
  helper.addCard(filteredPosts);

  // filter blog post by date from
  if (currentFilters.fromDate !== null) {
    filteredPosts = helper.filterBlogPostsByDateFrom(
      $startData.value,
      $endData.value,
      filteredPosts
    );
  }

  // filter blog post by date to
  if (currentFilters.toDate !== null) {
    filteredPosts = helper.filterBlogPostsByDateTo(
      $startData.value,
      $endData.value,
      filteredPosts
    );
  }

  // filter blog post by category
  if (
    currentFilters.category !== "" &&
    currentFilters.category !== "Category"
  ) {
    filteredPosts = helper.filterBlogPostsByCategory(
      currentFilters.category,
      filteredPosts
    );
  }

  // sort blog posts by date ascending
  if (currentFilters.sortOrder === "asc") {
    filteredPosts = helper.sortByDateAscending(filteredPosts);
  }

  // sort blog posts by date descending
  if (currentFilters.sortOrder === "dec") {
    filteredPosts = helper.sortByDateDescending(filteredPosts);
  }

  // selecting a category from the drop-down menu
  document
    .querySelectorAll(".nav__category-dropdown div")
    .forEach((element) => {
      element.addEventListener("click", () => {
        currentFilters.category = element.innerHTML.trim(); // setting the filtration object
        getData();

        // currentFilters.category = element.innerHTML.trim()
        $dropdownBtn.innerHTML = `
            ${element.innerHTML.trim()}
            <i class="bx bx-chevron-down" id="category-arrow"></i>
            `;
      });
    });
};

// toggle button to sort the date
let isOldest = true;
$button.addEventListener("click", () => {
  isOldest = !isOldest;

  $button.textContent = isOldest ? "Ascending" : "Descending";
  // setting the filtration object
  if ($button.textContent === "Ascending") currentFilters.sortOrder = "asc";
  // setting the filtration object
  if ($button.textContent === "Descending") currentFilters.sortOrder = "dec";

  getData();
});

// date range selection
$filterbutton.addEventListener("click", () => {
  // setting the filtration object
  $startData.value !== ""
    ? (currentFilters.fromDate = $startData.value)
    : (currentFilters.fromDate = null);

  // setting the filtration object
  $endData.value !== ""
    ? (currentFilters.toDate = $endData.value)
    : (currentFilters.toDate = null);

  getData();
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
let category = false;
document.querySelectorAll(".nav__category-dropdown div").forEach((element) => {
  element.addEventListener("click", () => {
    category = !category;
    getData();
  });
});

currentFilters.category = $dropdownBtn.innerText;

getData();
