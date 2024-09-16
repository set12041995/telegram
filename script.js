const numbers = [16, -37, 54, -4, 72, -56, 47, 4, -16, 25, -37, 46, 4, -51, 27, -63, 4, -54, 76, -4, 12, -35, 4, 47]

// 1.1

// let symaNumberPositive = 0;
// let lengthsPositiveNumbers = 0;

// for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] > 0) {
//         symaNumberPositive += numbers[i];
//         lengthsPositiveNumbers++;
//     }
// }
// console.log('1.Знайти суму та кількість позитивних елементів;', 'Сума:', symaNumberPositive, 'Kількість позитивних елементів:', lengthsPositiveNumbers);


// 1.2

// let positiveNumbers = numbers.filter(function (number) {
//     return number > 0;
// });

// let symaNumberPositive = positiveNumbers.reduce(function (sum, current) {
//     return sum + current;
// });

// let lengthsPositiveNumbers = positiveNumbers.length

// console.log('1.Знайти суму та кількість позитивних елементів;', 'Сума:', symaNumberPositive, 'Kількість позитивних елементів:', lengthsPositiveNumbers);


// 1.3

let symaNumberPositive = 0;
let lengthsPositiveNumbers = 0;

numbers.forEach((el) => {
    if (el > 0) {
        symaNumberPositive += el;
        lengthsPositiveNumbers++;
    }
})

console.log('1.Знайти суму та кількість позитивних елементів;', 'Сума:', symaNumberPositive, 'Kількість позитивних елементів:', lengthsPositiveNumbers);


// 2
let minNumber = 0;

numbers.forEach((el) => {
    if (minNumber > el) {
        minNumber = el;
    }
})
indexMinNumber = numbers.indexOf(minNumber);
console.log('2.Знайти мінімальний елемент масиву та його порядковий номер;', 'Мінімальний елемент:', minNumber, ' Порядковий номер:', indexMinNumber);


// 3

let maxNumber = 0;

numbers.forEach((el) => {
    if (maxNumber < el) {
        maxNumber = el;
    }
})
indexMaxNumber = numbers.indexOf(maxNumber);
console.log('3.Знайти максимальний елемент масиву та його порядковий номер;', 'Максимальний елемент масиву:', maxNumber, ' Порядковий номер:', indexMaxNumber);


// 4
let negativeNumber = numbers.filter(function (number) {
    return number < 0;
});

let quantityNegativeNumber = negativeNumber.length

console.log('4.Визначити кількість негативних елементів;', 'Кількість негативних елементів: ', quantityNegativeNumber);

// 5

let numberOfOddPositiveElements = 0;
let sumOfOddPositiveElements = numbers.reduce(function (acc, el) {
    if (el > 0 && el % 2 !== 0) {
        numberOfOddPositiveElements++;
    }
    return acc + el;
});

console.log('5.Знайти кількість непарних позитивних елементів;', 'Kількість :', numberOfOddPositiveElements);

// 6

let numberOfEvenPositiveElements = 0;
let sumOfEvenPositiveElements = numbers.reduce(function (acc, el) {
    if (el > 0 && el % 2 === 0) {
        numberOfEvenPositiveElements++;
    }
    return acc + el;
});

console.log('6.Знайти кількість парних позитивних елементів;', 'Kількість :', numberOfEvenPositiveElements);

// 7
console.log('7.Знайти суму парних позитивних елементів;', 'Сума: ', sumOfEvenPositiveElements)

// 8
console.log('8.Знайти суму непарних позитивних елементів;', 'Сума: ', sumOfOddPositiveElements)

// 9
let productOfPositiveElements = numbers.reduce(function (acc, el) {
    if (el > 0) {
        return acc * el;
    }
    return acc;
});

console.log('9.Знайти добуток позитивних елементів.', 'Добуток:', productOfPositiveElements);

// 10
let maxNumberAndZeros = [];
numbers.map(el => {
    if (el === maxNumber) maxNumberAndZeros.push(el);
    else maxNumberAndZeros.push(0);
})
console.log('10.Знайти найбільший серед елементів масиву, решту обнулити. (решта елементів має дорівнювати 0);', 'Масив матиме такий вигляд:', maxNumberAndZeros);