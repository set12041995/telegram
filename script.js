const year_user = prompt("Год рождения")
const year_user_number = Number(year_user)
let year = "2023"
let c = year - year_user_number
confirm("Вам " + c + " год? ")

const name = prompt("Имя")
confirm("Ваше имя " + name + " ?")

const lost_name = prompt("Фамилия")
confirm("Ваша фамилия " + lost_name + " ?")

console.log("User Bio:" + name + lost_name + c)



