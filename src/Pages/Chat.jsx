import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import AuthButton from "../Components/AuthButton";
import Input from "../Components/Input";
import Message from "../Components/Message";
const { REACT_APP_TOKEN, REACT_APP_API } = process.env;
export default function Chat() {
  const [update, setUpdate] = useState(true);
  const [chat, setChat] = useState("Nope");
  let form = useRef();
  let navigate = useNavigate();
  function submit(e) {
    e.preventDefault();
    const now = new Date();
    axios
      .post(`${REACT_APP_API}/chat`, {
        username: window.sessionStorage.getItem(REACT_APP_TOKEN + "Name"),
        message: form.current.children[0].children[1].value,
        date: now,
      })
      .then((res) => console.log(res));
    form.current.children[0].children[1].value = "";
  }
  useEffect(() => {
    if (!window.sessionStorage.getItem(REACT_APP_TOKEN)) {
      navigate("/chat-frontend/login");
    }
  }, [navigate]);
  useEffect(() => {
    let up = setInterval(() => {
      setUpdate(!update);
    }, 1000);
    return () => {
      clearInterval(up);
    };
  });
  useEffect(() => {
    axios.get(`${REACT_APP_API}/chat`).then((res) => {
      setChat(res.data);
    });
  });
  return (
    <div className="frame">
      {chat === "Nope" ? (
        <p>Loading...</p>
      ) : (
        <div>
          {chat.map((msg) => {
            let date = new Date(msg.date);
            let hours =
              date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let minutes =
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes();
            let you =
              window.sessionStorage.getItem(REACT_APP_TOKEN + "Name") ===
              msg.username;
            return (
              <Message
                user={msg.username}
                message={msg.message}
                time={`${hours}:${minutes}`}
                you = {you}
              />
            );
          })}
        </div>
      )}
      <form ref={form} onSubmit={submit}>
        <Input type="text" placeholder="Write a message..." error="" />
        <AuthButton text="Send" />
      </form>
    </div>
  );
}
