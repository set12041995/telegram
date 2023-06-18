import React, { useState} from 'react';
import axios from 'axios';
import './style.css'; 

async function getUsers() {
  try {
    const response = await axios.get('https://634e9f834af5fdff3a625f84.mockapi.io/users');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function createUser(name, email, password) {
  const user = {
    status: true,
    name: name,
    email: email,
    password: password,
  };

  try {
    const response = await axios.post('https://634e9f834af5fdff3a625f84.mockapi.io/users', user);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating user');
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [mailAlreadyExist, setMailAlreadyExist] = useState(false);
  const [passwordNotMatches, setPasswordNotMatches] = useState(false);

  async function handleLoginSubmit(event) {
    event.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    const users = await getUsers();
    const loggedInUser = users.find(user => user.email === userData.email && user.password === userData.password);

    if (loggedInUser) {
      console.log('Все ОК');
      loggedInUser.status = true;

      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

      try {
        await axios.put(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${loggedInUser.id}`, loggedInUser);
        setInvalidEmail(false);
        setInvalidPassword(false);
        window.location.href = 'index.html';
      } catch (error) {
        console.log(error);
      }
    } else if (users.find(user => user.email === userData.email)) {
      setInvalidPassword(true);
      setInvalidEmail(false);
      console.log('Неправильний пароль');
    } else {
      setInvalidEmail(true);
      setInvalidPassword(false);
      console.log('Неправильний email');
    }
  }

  async function handleRegistrationSubmit(event) {
    event.preventDefault();

    if (password !== verifyPassword) {
      setPasswordNotMatches(true);
    } else {
      const users = await getUsers();

      if (users.some(element => element.email === email)) {
        setMailAlreadyExist(true);
      } else {
        try {
          await createUser(name, email, password);
          window.location.href = 'index.html';
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <div className="container">
      <form className="loginForm" onSubmit={handleLoginSubmit}>
        <h1>Secure Sing In</h1>
        <h3>For current customers</h3>
        {invalidEmail && (
          <div className="invalidEmail">
            <p>Invalid Email</p>
          </div>
        )}
        {invalidPassword && (
          <div className="invalidPassword">
            <p>Invalid Password</p>
          </div>
        )}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit" id="loginFormButtom">Sign in</button>
      </form>

      <form className="registrationForm" onSubmit={handleRegistrationSubmit}>
        <h2>Registration</h2>
        {mailAlreadyExist && (
          <div className="mailAlreadyExist">
            <p>User with email {email} already exists!</p>
          </div>
        )}
        {passwordNotMatches && (
          <div className="passwordNotMatches">
            <p>Passwords do not match</p>
          </div>
        )}
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="registrationEmail"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="registrationPassword"
            name="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="verify-password"
            name="verify-password"
            placeholder="Verify Password"
            value={verifyPassword}
            onChange={event => setVerifyPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit" id="registrationButton">Create Account</button>
      </form>
    </div>
  );
}
