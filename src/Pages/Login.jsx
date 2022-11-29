import React, { useEffect, useRef, useState } from "react";
import FormHeader from "../Components/FormHeader";
import Input from "../Components/Input";
import AuthButton from "../Components/AuthButton";
import Form from "../Components/Form";
import { authentication } from "../Databases";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
const { REACT_APP_TOKEN } = process.env;
export default function Login() {
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const form = useRef();
  const loading = useRef();
  const button = useRef();
  let navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    let valid;
    let username = form.current.children[1].children[1].value;
    let password = form.current.children[2].children[1].value;
    setPasswordError("");
    setUsernameError("");
    loading.current.style.display = "block";
    button.current.style.display = "none";

    valid = await authentication(username, password);
    if (valid === "valid") {
      window.sessionStorage.setItem(REACT_APP_TOKEN, "true");
      window.sessionStorage.setItem(REACT_APP_TOKEN + "Name", username);
      navigate("/chat-frontend/chat");
    } else if (valid === "invalid") {
      setPasswordError("Password is incorrect");
    } else {
      setUsernameError("Username or email does not exist");
    }
    loading.current.style.display = "none";
    button.current.style.display = "block";
  }
  useEffect(() => {
    if (window.sessionStorage.getItem(REACT_APP_TOKEN) === "true") {
      navigate("/chat-frontend/chat");
    }
  }, [navigate]);
  return (
    <Form onSubmit={onSubmit} form={form}>
      <FormHeader title="SIGN IN" />
      <Input
        placeholder="Enter your username"
        label="Username"
        id="name"
        type="text"
        error={usernameError}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        id="Password"
        type="password"
        error={passwordError}
      />
      <AuthButton text="SIGN IN" refe={button} />
      <div
        ref={loading}
        style={{ display: "none", width: "40px", margin: "0 auto" }}>
        <ReactLoading type={"spin"} color={"green"} height={40} width={40} />
      </div>
      <p className="italic decoration-slate-700">
        If you don't already have an acount,
        <Link to={"/chat-frontend/registration"} className="font-bold">
          Register
        </Link>
      </p>
      <Link to={"/chat-frontend/recovery"} className="font-bold">
        Forgot password?
      </Link>
    </Form>
  );
}
