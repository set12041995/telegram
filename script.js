const name = prompt("Имя")
const lostName = prompt("Фамилия")
const den = +prompt("Дата рождения");
const month = +prompt("Месяц рождения");
const yearUser = +prompt("Год рождения")
let currentlyYear = "2022"
let year = currentlyYear - yearUser
let years = year + " Лет"

switch (month) {
    case 1:
        den <= 19 ? znak = 'Козерог &#9809' : znak = 'Водолей &#9810';
        break;
    case 2:
        den <= 18 ? znak = 'Водолей &#9810' : znak = 'Рыбы &#9811';
        break;
    case 3:
        den <= 20 ? znak = 'Рыбы &#9811' : znak = 'Овен &#9800';
        break;
    case 4:
        den <= 19 ? znak = 'Овен &#9800' : znak = 'Телец &#9801';
        break;
    case 5:
        den <= 20 ? znak = 'Телец &#9801' : znak = 'Близнецы &#9802';
        break;
    case 6:
        den <= 21 ? znak = 'Близнецы &#9802' : znak = 'Рак &#9803';
        break;
    case 7:
        den <= 22 ? znak = 'Рак &#9803' : znak = 'Лев &#9804';
        break;
    case 8:
        den <= 22 ? znak = 'Лев &#9804' : znak = 'Дева &#9805';
        break;
    case 9:
        den <= 22 ? znak = 'Дева &#9805' : znak = 'Весы &#9806';
        break;
    case 10:
        den <= 22 ? znak = 'Весы &#9806' : znak = 'Скорпион &#9807';
        break;
    case 11:
        den <= 22 ? znak = 'Скорпион &#9807' : znak = 'Стрелец &#9808';
        break;
    case 12:
        den <= 21 ? znak = 'Стрелец &#9808' : znak = 'Козерог &#9809';
        break;
}

function isLeapYear(yearUser) {
    return yearUser % 400 === 0 || (yearUser % 100 !== 0 && yearUser % 4 === 0);
}
if (isLeapYear(yearUser)) {
    document.write(`User Bio: ${name}, ${lostName}, ${years}, Высокосный год ${znak}`);
} else {
    document.write(`User Bio: ${name}, ${lostName}, ${years}, Не высокосный год ${znak}`);
}