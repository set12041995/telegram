const vegetables = [
    {
        name: `tomato`,
        icon: `🍅`,
        price: 2.3
    },
    {
        name: `carrot`,
        icon: `🥕`,
        price: 1.5
    },
    {
        name: `corn`,
        icon: `🌽`,
        price: 2.78,
        season: true
    }
];

class Vegetable{
    constructor({name, icon, price, season=false}){
        this.type = `Vegetable`;
        this.seasonKoef = 1.3;
        this.name = name;
        this.icon = icon;
        this.price = price;
        this.season = season;
    }

    getPrice(){
        if (this.season) {
            return this.price * this.seasonKoef;
        } else {
            return this.price;
        }
    }

    getInfo(){
        return `Type: ${this.type}. SeasonKoef: ${this.seasonKoef}. Name: ${this.name}. Icon: ${this.icon}. Price: ${this.getPrice()}. ${this.season ? 'Season: true' : ''}`;
    }
}

const vegetableList = document.createElement('ul');

vegetables.forEach(vegetable => {
  const li = document.createElement('li');
  const veg = new Vegetable(vegetable);
  li.textContent = veg.getInfo();
  vegetableList.appendChild(li);
});

document.write(vegetableList.outerHTML);
