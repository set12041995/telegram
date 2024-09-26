// // 1

// const arr = [11, 'a', 'b', 'c', '/', 65, 33, 5, 24, '611'];

// function calc(arr) {
//     let newArr = 0;
//     let countre = 0;

//     for (let i = 0; i < arr.length; i++) {
//         if (typeof arr[i] === 'number') {
//             countre++;
//             newArr += arr[i];
//         }
//     }

//     return newArr / countre;
// }

// console.log(calc(arr));

// // 2

// let firstNumber = +prompt('Введіть перше число');
// let operation = prompt('Введіть математичну операцію');
// let secondNumber = +prompt('Введіть друге число');

// function doMath(x, znak, y) {
//     let result;

//     switch (znak) {
//         case '+':
//             result = x + y;
//             break;
//         case '-':
//             result = x - y;
//             break;
//         case '*':
//             result = x * y;
//             break;
//         case '/':
//             result = x / y;
//             break;
//         case '%':
//             result = x % y;
//             break;
//         case '^':
//             result = Math.pow(x, y);
//             break;
//         default:
//             result = 'Невірний знак математичної операції';
//     }

//     return result;
// }

// console.log(doMath(firstNumber, operation, secondNumber));


// // 3

// const userNumbersArr = +prompt('Введіть кількість масивів');
// const userNumbersElement = +prompt('Введіть кількість елементів в масиві');

// function fillArray(userNumbersArr, userNumbersElement) {
//     const arr = [];

//     for (let i = 0; i < userNumbersArr; i++) {
//         const el = [];

//         for (let j = 0; j < userNumbersElement; j++) {
//             const value = +prompt(`Введіть значення для масиву № ${i}, елемент № ${j}`)
//             el.push(value);
//         }

//         arr.push(el);
//     }

//     return arr;
// }

// const arr = fillArray(userNumbersArr, userNumbersElement);
// console.log(arr);


// 4

let userStr = prompt('Введіть вашу фразу');
let delateLtr = prompt('Введіть символи які ви хочите видалити');

function corrector(startString, corLetr) {
    let currCorStr = '';
    for (let i = 0; i < startString.length; i++) {
        if (corLetr.indexOf(startString.charAt(i)) === -1) {
            currCorStr += startString.charAt(i);
        }
    }
    return currCorStr;
}

console.log('Ваша відкоригована фраза: ' + corrector(userStr, delateLtr));