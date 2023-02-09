let arr = []
let res = 0

while (true) {
    let userNumber = prompt('Enter a number from 2 to 10')

    if (Math.abs(userNumber) > 2 && Math.abs(userNumber) < 10) {

        for (i = 0; i < userNumber; i++) {
            arr.push(Math.round(Math.random() * 10))
        }
        for (let el of arr) {
            res = res + el
        }
        console.log(arr)
        console.log(res)
        break;
    }
}
