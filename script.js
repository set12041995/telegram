const form = document.querySelector("form");
const favorite = document.querySelector("#favorite");
const joked = document.querySelector("#joke-list");
const radioButton = document.querySelectorAll("input[type=radio]");
const categoriesRadio = document.getElementById("categories");
const searchRadio = document.getElementById("search");
const randomRadio = document.getElementById("random");
const categoryWrap = document.querySelector(".category-wrap");
const searchInput = document.getElementById("freeText");
const containerFavourite = document.querySelector(".container-favourite");
const jokeFavourite = document.querySelector("#jokeFavourite");
const favouriteButton = document.querySelector(".favouriteButton");
const containerContent = document.querySelector(".container-content");
const BASE_URL = "https://api.chucknorris.io/jokes/";

async function getCategories() {
  const response = await fetch("https://api.chucknorris.io/jokes/categories");
  const data = await response.json();
  return data;
}

function renderCategories(categories) {
  const categoryWrap = document.querySelector(".category-wrap");

  categories.slice(0, 4).forEach((category) => {
    const label = document.createElement("label");
    label.textContent = category;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "category";
    input.id = category;
    input.value = category;
    input.classList.add("category-input");

    label.setAttribute("for", category);

    let div = document.createElement("div");
    div.className = "categoriesjokes";

    div.append(input);
    div.append(label);
    categoryWrap.append(div);
  });
}

getCategories()
  .then((categories) => renderCategories(categories))
  .catch((error) => console.log(error));

categoriesRadio.addEventListener("click", () => {
  categoryWrap.style.display = "block";
  searchInput.style.display = "none";
});

searchRadio.addEventListener("click", () => {
  categoryWrap.style.display = "none";
  searchInput.style.display = "block";
});

randomRadio.addEventListener("click", () => {
  categoryWrap.style.display = "none";
  searchInput.style.display = "none";
});

let markIfFavorite = (joke, img) => {
  let store = getStore();
  store.findIndex((el) => el.id === joke.id) >= 0 &&
    (img.src = "./img/heart.svg");
};

let addFavorite = (joke, store) => {
  store.push({ ...joke, like: true });

  localStorage.setItem("jokeFavourite", JSON.stringify(store));

  render({ ...joke, like: true });
};

let removeFavorite = (joke, store) => {
  let updateStore = store.filter((el) => el.id !== joke.id);
  localStorage.setItem("jokeFavourite", JSON.stringify(updateStore));

  jokeFavourite.querySelector(`.jokeDiv[data-id="${joke.id}"]`).remove();
};

let getStore = () => JSON.parse(localStorage.getItem("jokeFavourite")) ?? [];

let clickHeart = (joke) => {
  let img = document.querySelector(`.jokeDiv[data-id="${joke.id}"] .img`);
  let store = getStore();

  if (img.src.includes("heart")) {
    img.src = "./img/Vector.svg";
    removeFavorite(joke, store);
  } else {
    img.src = "./img/heart.svg";
    addFavorite(joke, store);
  }
};

let render = (joke) => {
  let jokeFavourite = document.querySelector("#jokeFavourite");
  let joked = document.querySelector("#joke-list");

  let jokeDiv = document.createElement("div");
  jokeDiv.classList.add("jokeDiv");
  jokeDiv.dataset.id = joke.id;

  let img = document.createElement("img");
  img.src = "./img/Vector.svg";
  img.dataset.id = joke.id;
  img.classList.add("img");
  jokeDiv.append(img);

  let block = document.createElement("div");
  block.classList.add("block");

  let imgMessage = document.createElement("img");
  imgMessage.src = "./img/message-light.svg";
  imgMessage.classList.add("imgMessage");
  block.appendChild(imgMessage);

  let divLink = document.createElement("div");
  divLink.classList.add("divLink");

  let id = document.createElement("p");
  id.classList.add("id");
  id.innerText = "ID: ";

  let link = document.createElement("a");
  link.classList.add("link");
  link.href = joke.url;
  link.innerText = joke.id;

  const linkImg = document.createElement("img");
  linkImg.classList.add("linkImg");
  linkImg.src = "img/link-icon.svg";

  id.appendChild(link);
  divLink.appendChild(id);
  link.appendChild(linkImg);
  block.appendChild(divLink);

  let p = document.createElement("p");
  p.innerHTML = joke.value;
  p.dataset.id = joke.id;
  p.classList.add("pText");

  let textP = document.createElement("div");
  textP.classList.add("textP");

  textP.append(p);
  block.append(textP);

  let hoursAndCategori = document.createElement("div");
  hoursAndCategori.classList.add("hoursAndCategori");

  let hours = document.createElement("div");
  hours.classList.add("hours");

  let jokeUpdated = new Date(joke.updated_at);
  let now = new Date();
  let diff = now.getTime() - jokeUpdated.getTime();
  let hoursAgo = Math.round(diff / (1000 * 60 * 60));

  let hoursP = document.createElement("p");
  hoursP.innerText = `Last update: ${hoursAgo} hours ago`;
  hours.appendChild(hoursP);

  hoursAndCategori.appendChild(hours);

  const jokeCategori = document.createElement("div");
  jokeCategori.classList.add("jokeCategori");

  if (joke.categories.length > 0) {
    jokeCategori.innerText = joke.categories;
    hoursAndCategori.appendChild(jokeCategori);
  }

  block.append(hoursAndCategori);
  jokeDiv.appendChild(block);

  img.addEventListener("click", () => clickHeart(joke));

  if (joke.like) {
    jokeCategori.style.background = "#F8F8F8";
    img.src = "./img/heart.svg";
    imgMessage.src = "./img/message-dark.svg";
    jokeFavourite.append(jokeDiv);
  } else {
    markIfFavorite(joke, img);
    joked.appendChild(jokeDiv);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const radioButton = document.querySelector(
    'input[name="radioButton"]:checked'
  );

  let fetchURL = BASE_URL;

  switch (radioButton.value) {
    case "random":
      fetchURL += `random`;
      break;
    case "categories":
      const chosenCategory = document.querySelector(
        ".category-wrap input:checked"
      );
      fetchURL += `search?query=${chosenCategory.value}`;
      break;
    case "search":
      const input = document.querySelector("#freeText");
      fetchURL += `search?query=${input.value}`;
      break;
    default:
      break;
  }

  fetch(fetchURL)
    .then((response) => response.json())
    .then((response) => {
      if (Array.isArray(response.result)) {
        response.result.forEach((joke) => {
          render(joke);
        });
      } else {
        render(response);
      }
    });
});

let renderFavorite = () => {
  let store = getStore();
  store.forEach((joke) => render(joke));
};

renderFavorite();

favouriteButton.addEventListener("click", () => {
  if (favouriteButton.style.backgroundImage.includes("close")) {
    favouriteButton.style.backgroundImage = "url(./img/fav-icon-menu.svg)";
    containerFavourite.style.zIndex = "1";
    containerContent.style.backgroundColor = "white";
  } else {
    favouriteButton.style.backgroundImage = "url(./img/fav-icon-close.svg)";
    containerFavourite.style.zIndex = "2";
    containerContent.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  }
});
