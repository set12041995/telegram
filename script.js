const userData = {
  USD: 1000,
  EUR: 900,
  UAH: 15000,
  BIF: 20000,
  AOA: 100,
};

const bankData = {
  USD: {
    max: 3000,
    min: 100,
    img: "💵",
  },
  EUR: {
    max: 1000,
    min: 50,
    img: "💶",
  },
  UAH: {
    max: 0,
    min: 0,
    img: "💴",
  },
  GBP: {
    max: 10000,
    min: 100,
    img: "💷",
  },
};

function getMoney() {
  return new Promise((resolve, reject) => {
    let answer;
    while (answer !== "так" && answer !== "ні") {
      answer = prompt(
        `Чи бажаєте подивитись баланс на карті? (введіть 'так' або 'ні')`
      )
        .trim()
        .toLowerCase();
    }
    if (answer == "так") {
      resolve();
    } else {
      reject();
    }
  });
}

getMoney()
  .then(checkBalance)
  .catch(takeCash)
  .finally(() => {
    console.log("Дякую, гарного дня 😊");
  });

function checkBalance() {
  let checkBalanceAnswer = "";
  while (!userData.hasOwnProperty(checkBalanceAnswer)) {
    checkBalanceAnswer = prompt(`Баланс якої валюти ви бажаєте подивитись?`)
      .trim()
      .toUpperCase();
  }

  console.log(
    `Баланс становить ${userData[checkBalanceAnswer]} ${checkBalanceAnswer}.`
  );
}

function takeCash() {
  let currencyAnswer = "";
  const availableCurrencies = checkAvailableCurrency();
  while (!availableCurrencies.includes(currencyAnswer)) {
    currencyAnswer = prompt(`Яку валюту бажаєте зняти?`).trim().toUpperCase();
  }

  let sumToTake;
  while (isNaN(sumToTake) || sumToTake < 0) {
    sumToTake = +prompt(`Яку суму бажаєте зняти?`);
  }

  if (sumToTake > userData[currencyAnswer]) {
    console.log(`На вашому балансі недостатньо грошей`);
  } else if (sumToTake > bankData[currencyAnswer].max) {
    console.log(
      `Введена сума більша за доступну. Максимальна сума зняття: ${bankData[currencyAnswer].max} `
    );
  } else if (sumToTake < bankData[currencyAnswer].min) {
    console.log(
      `Введена сума менша за доступну. Мінімальна сума зняття: ${bankData[currencyAnswer].min} `
    );
  } else {
    console.log(
      `Ось Ваші гроші - ${sumToTake} ${currencyAnswer} ${bankData[currencyAnswer].img}`
    );
  }
}

function checkAvailableCurrency() {
  const availableInBankomat = Object.keys(bankData).filter(
    (currency) => bankData[currency].max > 0
  );
  const availableInUserData = Object.keys(userData).filter((currency) =>
    availableInBankomat.includes(currency)
  );
  return availableInUserData;
}
