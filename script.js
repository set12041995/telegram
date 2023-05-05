let form = document.querySelector("form");
let createdHerosWeapper = document.querySelector("#createdHeros");
let heroes = {};

let render = (hero) => {
  let heroBlock = document.createElement("form");
  heroBlock.dataset.id = hero.id;

  let labelName = document.createElement("label");
  labelName.innerText = "Name:";
  let inputName = document.createElement("input");
  inputName.value = hero.name;
  labelName.append(inputName);
  heroBlock.append(labelName);

  let labelComics = document.createElement("label");
  labelComics.innerText = "Comics:";
  let selectName = document.createElement("select");
  let optionDC = document.createElement("option");
  optionDC.value = "DC";
  optionDC.innerText = "DC";
  selectName.append(optionDC);
  let optionMarvel = document.createElement("option");
  optionMarvel.value = "Marvel";
  optionMarvel.innerText = "Marvel";
  selectName.append(optionMarvel);
  selectName.value = hero.universe;
  labelComics.append(selectName);
  heroBlock.append(labelComics);

  let labelFavorite = document.createElement("label");
  labelFavorite.innerText = "Favorite:";
  labelFavorite.setAttribute("data-name", "favorite");
  let checkboxFavorite = document.createElement("input");
  checkboxFavorite.type = "checkbox";
  checkboxFavorite.checked = hero.favorite;
  checkboxFavorite.addEventListener("change", async (e) => {
    let updatedHero = {
      name: inputName.value,
      universe: selectName.value,
      favorite: checkboxFavorite.checked,
    };
    await updateHero(hero.id, updatedHero);
  });

  labelFavorite.append(checkboxFavorite);
  heroBlock.append(labelFavorite);

  let updateButton = document.createElement("button");
  updateButton.id = "update";
  updateButton.innerText = "Update";

  updateButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let updatedHero = {
      name: inputName.value,
      universe: selectName.value,
      favorite: checkboxFavorite.checked,
    };
    await updateHero(hero.id, updatedHero);
  });

  let deleteButton = document.createElement("button");
  deleteButton.id = "delete";
  deleteButton.innerText = "Delete";

  deleteButton.addEventListener("click", async (e) => {
    e.preventDefault();
    await deleteHero(hero.id);
    heroBlock.remove();
    delete heroes[hero.name];
  });

  heroBlock.append(updateButton, deleteButton);
  createdHerosWeapper.append(heroBlock);
  heroes[hero.name] = hero;
};

let updateHero = async (id, obj) => {
  let result = await fetch(
    `https://63693f7228cd16bba71904e4.mockapi.io/heroes/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  ).then((res) => res.json());
  heroes[result.name] = result;
};

let deleteHero = async (id) => {
  await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/heroes/${id}`, {
    method: "DELETE",
  });
};

let createHero = async (obj) => {
  let result = await fetch(
    "https://63693f7228cd16bba71904e4.mockapi.io/heroes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  ).then((res) => res.json());
  render(result);
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = form.querySelector('input[data-name="name"]');
  let universe = form.querySelector("select");
  let favorite = form.querySelector('input[type="checkbox"]');

  let newHero = {
    name: name.value,
    universe: universe.value,
    favorite: favorite.checked,
  };

  if (heroes[newHero.name]) {
    console.error(`A hero with the name "${newHero.name}" already exists!`);
    return;
  }

  await createHero(newHero);
});

let getExistedHerors = async () => {
  let result = await fetch(
    "https://63693f7228cd16bba71904e4.mockapi.io/heroes",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  result.forEach((element) => {
    render(element);
    heroes[element.name] = element;
  });

  return result;
};

getExistedHerors();
