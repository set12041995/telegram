const loginLink = document.querySelector(".login");
const cartCounter = document.querySelector(".cart_counter");
const shoppingCart = document.querySelector(".shopping_cart");

function isUserLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return (loggedInUser);
}


function getUsers() {
    return fetch("https://634e9f834af5fdff3a625f84.mockapi.io/users")
    .then(
      (response) => response.json()
    );
  }


let globalData;

async function fetchData(loggedInUser) {
  const response = await fetch(
    `https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser.id}`
  );
  const data = await response.json();
  globalData = data;
  return data;
}

  if (isUserLoggedIn()) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    fetchData(loggedInUser).then((data) => {
      cartCounter.innerText = `${data.shoppingCart.length}`;
    });
  
    logOutBlock = document.querySelector(".logOutBlock");
    logOutBlock.style.display = "block";
    loginLink.innerText = `Hi, ${loggedInUser.name}`;
    loginLink.href = "./account.html";
    shoppingCart.href = "./shoppingCart.html";
    logOutBlock.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
    });
  }

if (window.location.href.includes("index.html")) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  fetch("https://634e9f834af5fdff3a625f84.mockapi.io/products")
    .then((response) => response.json())
    .then((data) => {
      const categories = new Set();

      data.forEach((item) => categories.add(item.category));

      const categoriesContainer = document.querySelector(
        ".categoriesContainer"
      );
      categories.forEach((category) => {
        const section = document.createElement("section");
        section.classList.add("category");
        section.setAttribute("data-name", category);

        const h2 = document.createElement("h2");
        h2.textContent = category;
        section.appendChild(h2);

        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category__container");
        section.appendChild(categoryContainer);

        categoriesContainer.appendChild(section);
      });

      data.forEach((item) => {
        const categorySection = document.querySelector(
          `section[data-name="${item.category}"] .category__container`
        );

        const product = document.createElement("div");
        product.classList.add("product");
        product.id = item.id;

        const img = document.createElement("img");
        img.className = "productImg";
        img.src = `../images/products/${item.img}.png`;
        product.appendChild(img);

        const title = document.createElement("h3");
        title.textContent = item.title;
        product.appendChild(title);

        if (item.sale == true) {
          const saleWrapper = document.createElement("div");
          saleWrapper.classList.add("saleWrapper");

          const discountedPriceWrapper = document.createElement("div");
          discountedPriceWrapper.classList.add("discountedPriceWrapper");
          discountedPrice = document.createElement("div");
          discountedPrice.textContent = `$${item.price}`;
          discountedPriceWrapper.appendChild(discountedPrice);
          saleWrapper.appendChild(discountedPriceWrapper);

          const sale = document.createElement("div");
          sale.classList.add("sale");
          saleText = document.createElement("span");
          saleText.textContent = `-${item.salePercent}%`;
          sale.appendChild(saleText);

          saleWrapper.appendChild(sale);

          product.appendChild(saleWrapper);
        }

        const priceWrapper = document.createElement("div");
        priceWrapper.className = "priceWrapper";

        const price = document.createElement("div");
        if (item.sale == true) {
          price.textContent = `$${
            item.price - item.price * (item.salePercent / 100)
          }`;
        } else {
          price.textContent = `$${item.price}`;
        }

        priceWrapper.appendChild(price);
        product.appendChild(priceWrapper);

        const shoppingCartWrapper = document.createElement("a");
        shoppingCartWrapper.className = "shoppingCartWrapper";
        
        shoppingCartWrapper.addEventListener("click", () => clickCart(product));

        const shoppingCartProduct = document.createElement("img");
        shoppingCartProduct.className = "shoppingCartProduct";
        shoppingCartProduct.src = "../images/shopping-cart.png";
        shoppingCartWrapper.appendChild(shoppingCartProduct);
        priceWrapper.appendChild(shoppingCartWrapper);

        if (
          isUserLoggedIn() &&
          globalData.shoppingCart.some(
            (cartItem) => cartItem.id === product.id
          )
        ) {
          shoppingCartWrapper.style.backgroundColor = "red";
        } else {
          shoppingCartWrapper.style.backgroundColor = "green";
        }

        function clickCart(product) {
          const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
          if (loggedInUser) {
              const isInShoppingCart = globalData.shoppingCart.some(
                (item) => item.id === product.id
              );
              
              if (!isInShoppingCart) {
                addCart(product);
                shoppingCartWrapper.style.backgroundColor = "red";
              } else {
                deleteCart(product);
                shoppingCartWrapper.style.backgroundColor = "green";
              }
          } else {
            window.location.href = "./login.html";
          }
        }

        categorySection.appendChild(product);
      });
    });
}

function addCart(product) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  loggedInUser.shoppingCart.push({ id: product.id, count: "1" });

  
  const user = globalData;
  user.shoppingCart.push({ id: product.id, count: "1" });

  return fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        const cartCounter = document.querySelector(".cart_counter");
        cartCounter.innerText = user.shoppingCart.length;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      }
    });
}





if (window.location.href.includes("login.html")) {
  let loginForm = document.querySelector("form.loginForm");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let userData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    getUsers().then((response) => {
      const users = response;
      let loggedInUser = users.find(
        (user) =>
          user.email === userData.email && user.password === userData.password
      );

      let invalidEmail = document.querySelector(".invalidEmail");
      let invalidPassword = document.querySelector(".invalidPassword");

      if (loggedInUser) {
        console.log("Все ОК");
        loggedInUser.status = true;

        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        fetch(
          `https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loggedInUser),
          }
        ).then(() => {
          window.location.href = "index.html";
          invalidEmail.style.display = "none";
          invalidPassword.style.display = "none";
        });
      } else if (users.find((user) => user.email === userData.email)) {
        invalidPassword.style.display = "block";
        invalidEmail.style.display = "none";
        console.log("Неправильний пароль");
      } else {
        invalidEmail.style.display = "block";
        invalidPassword.style.display = "none";
        console.log("Неправильний email");
      }
    });
  });

  let registrationForm = document.querySelector("form.registrationForm");

  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const registrationNameInput = document.getElementById("name");
    const registrationEmailInput = document.getElementById("registrationEmail");
    const registrationPasswordInput = document.getElementById(
      "registrationPassword"
    );
    const registrationVerifyPasswordInput =
      document.getElementById("verify-password");

    let mailAlreadyExist = document.querySelector(".mailAlreadyExist");
    let passwordNotMatches = document.querySelector(".passwordNotMatches");

    const name = registrationNameInput.value;
    const email = registrationEmailInput.value;
    const password = registrationPasswordInput.value;
    const verifyPassword = registrationVerifyPasswordInput.value;

    if (password !== verifyPassword) {
      passwordNotMatches.style.display = "block";
    } else {
      getUsers().then((response) => {
        const mydata = response;
        if (mydata.some((element) => element.email === email)) {
          mailAlreadyExist.style.display = "block";
        } else {
          createUser(name, email, password);
        }
      });
    }
  });

 
  function createUser(name, email, password) {
    const user = {
      status: true,
      name: name,
      email: email,
      password: password,
    };

    fetch("https://634e9f834af5fdff3a625f84.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error creating user");
        }
      })
      .then((loggedInUser) => {
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

if (window.location.href.includes("shoppingCart.html")) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser.id}`)
    .then((response) => response.json())
    .then((apiData) => {
      fetch("https://634e9f834af5fdff3a625f84.mockapi.io/products")
        .then((response) => response.json())
        .then((data) => {
          apiData.shoppingCart.forEach((cartItem) => {
            const item = data.find((product) => product.id === cartItem.id);
            if (item) {
              createCartItemRow(item, cartItem);
            }
          });
          calculateTotalSum();
        });
    });

  function createCartItemRow(item, cartItem) {
    const cartTable = document.querySelector(".cartTable");

    const cartItemRow = document.createElement("tr");
    cartItemRow.classList.add("cartItemRow");
    cartItemRow.id = item.id;

    const imgTd = document.createElement("td");
    imgTd.className = "big";
    const img = document.createElement("img");
    img.src = `../images/products/${item.img}.png`;
    img.className = "productImg";
    imgTd.textContent = item.title;

    imgTd.appendChild(img);
    cartItemRow.appendChild(imgTd);

    const priceTd = document.createElement("td");
    priceTd.className = "small";
    priceTd.textContent = item.price;
    cartItemRow.appendChild(priceTd);

    const saleTd = document.createElement("td");
    saleTd.className = "small";
    if (item.sale === true) {
        saleTd.className = 'small saleTrue'
      saleTd.textContent = `-${item.salePercent}%`;
    } else {
      saleTd.textContent = `  -  `;
    }
    cartItemRow.appendChild(saleTd);

    const quantityTd = document.createElement("td");
    quantityTd.className = "big";
    const quantityInput = document.createElement("input");
    quantityInput.className = "quantityInput";
    quantityInput.id = cartItem.id;
    quantityInput.type = "number";
    quantityInput.value = cartItem.count;

    quantityInput.addEventListener("change", (event) =>
      totalPrice(event, item)
    );

    quantityTd.appendChild(quantityInput);
    cartItemRow.appendChild(quantityTd);

    const totalPriceTd = document.createElement("td");
    totalPriceTd.className = "totalPriceTd small";
    cartItemRow.appendChild(totalPriceTd);

    const deleteTd = document.createElement("td");
    deleteTd.className = "small";
    const imgDelete = document.createElement("img");
    imgDelete.addEventListener("click", () => deleteCart(item));
    imgDelete.className = "imgDelete";
    imgDelete.src = `../images/delete.png`;
    deleteTd.appendChild(imgDelete);
    cartItemRow.appendChild(deleteTd);

    cartTable.appendChild(cartItemRow);

    totalPrice(event, item);
  }

  function totalPrice(event, item) {
    let quantityInpu = document.querySelector(
      `input.quantityInput[id="${item.id}"]`
    );
    const newQuantity = quantityInpu.value;

    let totalPrice = 0;

    if (item.sale === true) {
      totalPrice =
        (item.price - item.price * (item.salePercent / 100)) * newQuantity;
    } else {
      totalPrice = item.price * newQuantity;
    }

    const totalPriceTd = event
      ? event.target.parentElement.nextElementSibling
      : document.getElementById(item.id).lastElementChild
          .previousElementSibling;
    totalPriceTd.textContent = `$${totalPrice.toFixed(2)}`;
    calculateTotalSum();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const cartItem = loggedInUser.shoppingCart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (cartItem) {
      cartItem.count = newQuantity;
      updateCartItemInAPI(loggedInUser.id, item.id, newQuantity);
    }
  }

  function updateCartItemInAPI(loggedInUser, itemId, newCount) {
    fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser}`)
      .then((response) => response.json())
      .then((apiData) => {
        const cartItem = apiData.shoppingCart.find(
          (cartItem) => cartItem.id === itemId
        );
        if (cartItem) {
          cartItem.count = newCount;
          return fetch(
            `https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser}`,
            {
              method: "PUT",
              body: JSON.stringify(apiData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      })
      .then((response) => response.json())

  }

  function calculateTotalSum() {
    let totalSum = 0;
    const totalPriceTds = document.querySelectorAll(".totalPriceTd");
    totalPriceTds.forEach((totalPriceTd) => {
      const priceText = totalPriceTd.textContent;
      const price = parseFloat(priceText.replace("$", ""));
      if (!isNaN(price)) {
        totalSum += price;
      }
    });

    const totalPriceElement = document.querySelector(".total-price");
    totalPriceElement.textContent = `$${totalSum.toFixed(2)}`;
  }

  let completeOrder = document.querySelector(".complete-order");
  completeOrder.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("loggedInUser"));
  
    const newOrder = data.shoppingCart.map((item) => ({
      id: item.id,
      count: item.count,
    }));
  
    data.orders.push(...newOrder);
    data.shoppingCart = [];
  
    localStorage.setItem("loggedInUser", JSON.stringify(data));
  
    fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${data.id}`)
      .then((response) => response.json())
      .then((apiData) => {
        if (apiData && apiData.shoppingCart) {
          const orders = apiData.shoppingCart.map((item) => ({
            id: item.id,
            count: item.count,
          }));
  
          apiData.orders.push(...orders);
          apiData.shoppingCart = [];
  
          fetch(
            `https://634e9f834af5fdff3a625f84.mockapi.io/users/${data.id}`,
            {
              method: "PUT",
              body: JSON.stringify(apiData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((updatedData) => {
              window.location.href = "./account.html";
            });
        }
      });
  });
  };


if (window.location.href.includes("account.html")) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const name = document.querySelector(".name");
  const userName = document.createElement("div");
  userName.innerText = loggedInUser.name;
  name.append(userName);

  const email = document.querySelector(".email");
  const userEmail = document.createElement("div");
  userEmail.innerText = loggedInUser.email;
  email.append(userEmail);

  fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser.id}`)
    .then((response) => response.json())
    .then((apiData) => {
      fetch("https://634e9f834af5fdff3a625f84.mockapi.io/products")
        .then((response) => response.json())
        .then((data) => {
          apiData.orders.forEach((cartItem) => {
            const item = data.find((product) => product.id === cartItem.id);
            if (item) {
              createCartItemRow(item, cartItem);
            }
          });
        });
    });

  function createCartItemRow(item, cartItem) {
    const cartTable = document.querySelector(".cartTable");

    const cartItemRow = document.createElement("tr");
    cartItemRow.classList.add("cartItemRow");
    cartItemRow.id = item.id;

    const imgTd = document.createElement("td");
    imgTd.className = "big";
    const img = document.createElement("img");
    img.src = `../images/products/${item.img}.png`;
    img.className = "productImg";
    imgTd.innerText = item.title;
    imgTd.appendChild(img);
    cartItemRow.appendChild(imgTd);

    const priceTd = document.createElement("td");
    priceTd.className = "small";
    priceTd.textContent = item.price;
    cartItemRow.appendChild(priceTd);

    const saleTd = document.createElement("td");
    saleTd.className = "small";
    if (item.sale === true) {
        saleTd.className = 'small saleTrue'
      saleTd.textContent = `-${item.salePercent}%`;
    } else {
      saleTd.textContent = "-";
    }
    cartItemRow.appendChild(saleTd);

    const quantityTd = document.createElement("td");
    quantityTd.className = "small";
    quantityTd.innerText = cartItem.count;
    cartItemRow.appendChild(quantityTd);

    const totalPriceTd = document.createElement("td");
    totalPriceTd.className = "small";
    if (item.sale === true) {
      totalPriceTd.innerText =
        (item.price - item.price * (item.salePercent / 100)) * cartItem.count;
    } else {
      totalPriceTd.innerText = item.price * cartItem.count;
    }
    cartItemRow.appendChild(totalPriceTd);

    cartTable.appendChild(cartItemRow);
  }

  let deleteAccount = document.querySelector(".deleteAccount");
  deleteAccount.addEventListener("click", () => {
   
    fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: false,
        }),
      })
        .then((response) => {
          if (response.ok) {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
          }
        });
  });
}

function deleteCart(product) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    fetchData(loggedInUser)
      .then(() => {
        const shoppingCart = globalData.shoppingCart;
        const index = shoppingCart.findIndex((item) => item.id === product.id);

        if (index !== -1) {
          shoppingCart.splice(index, 1);
          loggedInUser.shoppingCart = shoppingCart;

          return fetch(
            `https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ shoppingCart: shoppingCart }),
            }
          );
        }
      })
      .then((response) => {
        if (response.ok) {
          // Оновлення лічильника кошика в інтерфейсі
          const cartCounter = document.querySelector(".cart_counter");
          cartCounter.innerText = loggedInUser.shoppingCart.length;
          localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

          const rowToDelete = document.querySelector(
            `tr.cartItemRow[id="${product.id}"]`
          );
          if (rowToDelete) {
            rowToDelete.remove();
            calculateTotalSum();
          }
        }
      });
  }
}
