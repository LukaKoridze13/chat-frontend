import React, { useEffect, useRef, useState } from "react";
import FormHeader from "../Components/FormHeader";
import Input from "../Components/Input";
import AuthButton from "../Components/AuthButton";
import Form from "../Components/Form";
import { checkEmail, checkUsername } from "../Databases";
import { sha256 } from "js-sha256";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const { REACT_APP_API,REACT_APP_TOKEN } = process.env;
export default function Registration() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const form = useRef();
  let navigate = useNavigate()
  async function onSubmit(e) {
    e.preventDefault();
    let valid = 0;
    let name = form.current.children[1].children[1].value;
    let surname = form.current.children[2].children[1].value;
    let username = form.current.children[3].children[1].value;
    let email = form.current.children[4].children[1].value;
    let password = form.current.children[5].children[1].value;
    let repeatPassword = form.current.children[6].children[1].value;
    setEmailError("");
    setPasswordError("");
    setRepeatPasswordError("");
    setSurnameError("");
    setNameError("");
    setUsernameError("");
    if (name.length === 0) {
      setNameError("Please enter a name");
    } else if (name.length < 2) {
      setNameError("Name must be at least 2 characters");
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      setNameError("Name must contain only letters");
    } else {
      valid++;
    }
    if (surname.length === 0) {
      setSurnameError("Please enter a surname");
    } else if (surname.length < 2) {
      setSurnameError("Surname must be at least 2 characters");
    } else if (!/^[a-zA-Z]+$/.test(surname)) {
      setNameError("Surname must contain only letters");
    } else {
      valid++;
    }
    if (username.length === 0) {
      setUsernameError("Please enter a username");
    } else if (username.length < 2) {
      setUsernameError("Username must be at least 2 characters");
    } else if (await checkUsername(username)) {
      setUsernameError("Username is already taken");
    } else {
      valid++;
    }
    if (email.length === 0) {
      setEmailError("Please enter an E-Mail");
    } else if (!email.includes("@")) {
      setEmailError('Email must include "@"');
    } else if (await checkEmail(email)) {
      setEmailError("Email is already registered");
    } else {
      valid++;
    }
    if (password.length === 0) {
      setPasswordError("Please enter a password");
    } else if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters");
    } else {
      valid++;
    }
    if (repeatPassword.length === 0) {
      setRepeatPasswordError("Please repeat the password");
    } else if (repeatPassword !== password) {
      setRepeatPasswordError("Passwords do not match");
    } else {
      valid++;
    }
    if (valid === 6) {
      let user = { name, surname, username, email, password: sha256(password) };
      axios
        .post(`${REACT_APP_API}/users`, user)
        .then((res) => [console.log(res)]);
    }
  }
  useEffect(() => {
    if (window.sessionStorage.getItem(REACT_APP_TOKEN) === 'true') {
      navigate("/chat");
    }
  });
  return (
    <Form onSubmit={onSubmit} form={form}>
      <FormHeader title="REGISTRATION" />
      <Input
        placeholder="Enter your name"
        label="Name"
        id="name"
        type="text"
        error={nameError}
      />
      <Input
        placeholder="Enter your surname"
        label="Surname"
        id="surname"
        type="text"
        error={surnameError}
      />
      <Input
        placeholder="Enter your username"
        label="Username"
        id="username"
        type="text"
        error={usernameError}
      />
      <Input
        placeholder="Enter your email"
        label="Email"
        id="email"
        type="email"
        error={emailError}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        id="Password"
        type="password"
        error={passwordError}
      />
      <Input
        placeholder="Repeat your password"
        label="Repeat password"
        id="repeatPassword"
        type="password"
        error={repeatPasswordError}
      />
      <AuthButton text="REGISTER" />
      <p className="italic decoration-slate-700">
        If you already have an acount, try to
        <Link to={"/login"} className="font-bold">Sign in </Link>
        or
        <Link to={"/recovery"} className="font-bold">Reset password</Link>
      </p>
    </Form>
  );
}
