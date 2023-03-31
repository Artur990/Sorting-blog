// sorting category display function
export const addCategory = (arr) => {
  const list = document.getElementById("dropdown");
  list.innerHTML = "";
  const uniqueArr = arr.filter((elem, index, self) => {
    return index === self.findIndex((t) => t.category === elem.category);
  });
  list.innerHTML += `<div>all</div>`;
  uniqueArr.forEach((el) => {
    const newCategory = `
   <div>${el.category}</div>`;
    list.innerHTML += newCategory;
  });
};

// date range filtering function
export const filterBlogPostsByDate = (startDate, endDate, arr) => {
  let newArr = arr.filter((post) => {
    var postDate = Date.parse(post.date);
    return postDate >= Date.parse(startDate) && postDate <= Date.parse(endDate);
  });
  if (newArr.length === 0) {
    return alert("No posts in this ranking");
  } else {
    addCard(newArr);
  }
};

// category sorting function
export const filterBlogPostsByCategory = (category, arr) => {
  if (category === "all") {
    return addCard(arr);
  } else {
    let newArr = arr.filter((post) => post.category === category);
    return addCard(newArr);
  }
};

// function for displaying data cards
export const addCard = (arr, param) => {
  const list = document.getElementById("container-cards");
  list.innerHTML = "";
  if (param !== "sort") {
    arr.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }
  arr.forEach((el) => {
    const newCard = `
        <div class="container-card">
          <div><span>${el.category} </span> - ${el.date}</div>
          <h1>${el.title}</h1>
          <p>${el.content}</p>
        </div>
    `;
    list.innerHTML += newCard;
  });
};

// function to sort the date from ascending
export const sortByDateAscending = (posts) => {
  posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  addCard(posts, "sort");
};
// function to sort the date from descending
export const sortByDateDescending = (arr) => {
  arr.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  addCard(arr, "sort");
};
