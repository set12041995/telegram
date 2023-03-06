class Hamburger {
  static SIZE_SMALL = { price: 50, calories: 20 };
  static SIZE_BIG = { price: 100, calories: 40 };
  static STUFFING_CHEESE = { price: 10, calories: 20 };
  static STUFFING_SALAD = { price: 20, calories: 5 };
  static STUFFING_POTATO = { price: 15, calories: 10 };
  static TOPPING_MAYO = { price: 20, calories: 5 };
  static TOPPING_SPICE = { price: 15, calories: 0 };

  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
  }

  addTopping(topping) {
    this.toppings.push(topping);
  }

  removeTopping(topping) {
    const index = this.toppings.indexOf(topping);
    if (index !== -1) {
      this.toppings.splice(index, 1);
    }
  }

  get price() {
    const toppingsPrice = this.toppings.reduce(
      (acc, topping) => acc + topping.price,
      0
    );
    return this.size.price + this.stuffing.price + toppingsPrice;
  }

  get calories() {
    const toppingsCalories = this.toppings.reduce(
      (acc, topping) => acc + topping.calories,
      0
    );
    return this.size.calories + this.stuffing.calories + toppingsCalories;
  }
}

const hamburger = new Hamburger(
  Hamburger.SIZE_SMALL,
  Hamburger.STUFFING_CHEESE
);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
console.log(`Calories: ${hamburger.calories}`);
console.log(`Price: ${hamburger.price}`);
hamburger.addTopping(Hamburger.TOPPING_SPICE);
console.log(`Price with sauce: ${hamburger.price}`);
