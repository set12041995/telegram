let password = '';
let errors = '';
let tries = 3;

while (tries > 0) {
    let email = prompt('Please enter your email:');
    if (!email.trim() || email.length < 1 || email.length > 15 || email.indexOf('@') === -1 || email.slice(-4) !== '.com') {
        tries--;
        errors = 'Your email address is invalid. It must be between 1 and 15 characters long. Only 1 "@" sign and end with .com';
        alert(errors + ' You have ' + tries + ' tries left.');
    } else {
        password = prompt('Please enter a password:');
        if (!password.trim() || password.match(/[A-Z]/) === null || password.length < 4 || password.length > 12) {
            tries--;
            errors = 'Your password is invalid. It must have at least 1 capital letter and have a length of 4 to 12 characters.';
            alert(errors + ' You have ' + tries + ' tries left.');
            password = '';
        } else {
            document.write(`Your account successfully registered!: Email: ${email}, Password: ${password}`);
            break;
        }
    }
}

if (tries === 0) {
    alert('Sorry, you don`t have more tries.');
}