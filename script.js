const name = prompt("Имя")

const lost_name = prompt("Фамилия")

const den = parseInt(window.prompt("Дата рождения"));
const month = parseInt(window.prompt('Месяц рождения'));

switch (month) {
    case 1:
        if (den <= 19)
            znak = 'Козерог';
        else
            znak = 'Водолей';
        break;
    case 2:
        if (den <= 18)
            znak = 'Водолей';
        else
            znak = 'Рыбы';
        break;
    case 3:
        if (den <= 20)
            znak = 'Рыбы';
        else
            znak = 'Овен';
        break;
    case 4:
        if (den <= 19)
            znak = 'Овен';
        else
            znak = 'Телец';
        break;
    case 5:
        if (den <= 20)
            znak = 'Телец';
        else
            znak = 'Близнецы';
        break;
    case 6:
        if (den <= 21)
            znak = 'Близнецы';
        else
            znak = 'Рак';
        break;
    case 7:
        if (den <= 22)
            znak = 'Рак';
        else
            znak = 'Лев';
        break;
    case 8:
        if (den <= 22)
            znak = 'Лев';
        else
            znak = 'Дева';
        break;
    case 9:
        if (den <= 22)
            znak = 'Дева';
        else
            znak = 'Весы';
        break;
    case 10:
        if (den <= 22)
            znak = 'Весы';
        else
            znak = 'Скорпион';
        break;
    case 11:
        if (den <= 22)
            znak = 'Скорпион';
        else
            znak = 'Стрелец';
        break;
    case 12:
        if (den <= 21)
            znak = 'Стрелец';
        else
            znak = 'Козерог';
        break;
}

const yearUser = prompt("Год рождения")
let yearUserNumber = Number(yearUser)
let currentlyYear = "2022"
let year = currentlyYear - yearUserNumber
let years = year + "Лет"

function isLeapYear(yearUserNumber) {
    return yearUserNumber % 400 === 0 || (yearUserNumber % 100 !== 0 && yearUserNumber % 4 === 0);
}
if (isLeapYear(yearUserNumber)) {
    a = "Высокосный год";
} else {
    a = " Не высокосный год";
}

let c = yearUserNumber
console.log("User Bio:" + name + lost_name + years + a + znak);

document.write("User Bio:" + name + lost_name + years + a + znak);