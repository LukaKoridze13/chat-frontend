import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import AuthButton from "../Components/AuthButton";
import Message from "../Components/Message";
const { REACT_APP_TOKEN, REACT_APP_API } = process.env;
export default function Chat() {
  const [update, setUpdate] = useState(true);
  const [chat, setChat] = useState("Nope");
  const [count, setCount] = useState(0);
  let form = useRef();
  let navigate = useNavigate();
  let chatr = useRef();
  function submit(e) {
    e.preventDefault();
    const now = new Date();
    axios.post(`${REACT_APP_API}/chat`, {
      username: window.sessionStorage.getItem(REACT_APP_TOKEN + "Name"),
      message: form.current.children[0].value,
      date: now,
    });

    form.current.children[0].value = "";
  }
  function logout() {
    window.sessionStorage.removeItem(REACT_APP_TOKEN + "Name");
    window.sessionStorage.removeItem(REACT_APP_TOKEN);
    navigate("/chat-frontend/login");
  }
  function getMonthString(num) {
    let month;
    switch (num) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
      default:
        month = "Invalid month";
    }
    return month;
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
  useEffect(() => {
    if (chatr.current !== undefined) {
      chatr.current.scrollTop = chatr.current.scrollHeight;
    }
  }, [count]);
  return (
    <div className="containerChat">
      <div className="frame">
        {chat === "Nope" ? (
          <p>Loading...</p>
        ) : (
          <div className="chat" ref={chatr}>
            {chat.map((msg, i) => {
              let date = new Date(msg.date);
              let hours =
                date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
              let minutes =
                date.getMinutes() < 10
                  ? "0" + date.getMinutes()
                  : date.getMinutes();
              let time = `${hours}:${minutes}`;
              let you =
                window.sessionStorage.getItem(REACT_APP_TOKEN + "Name") ===
                msg.username;
              if (i > count) {
                setCount(i);
              }
              let now = new Date();
              if (now.getDate() > date.getDate()) {
                time = date.getDate() + " " + getMonthString(date.getMonth());
              }
              if (now.getMonth() > date.getMonth()) {
                time = date.getDate() + " " + getMonthString(date.getMonth());
              }
              if (now.getFullYear() > date.getFullYear()) {
                time = date.getFullYear();
              }
              return (
                <Message
                  user={msg.username}
                  message={msg.message}
                  time={time}
                  you={you}
                  key={msg._id}
                />
              );
            })}
          </div>
        )}
        <form ref={form} onSubmit={submit}>
          <textarea
            onKeyUp={(e) => {
              e.key === "Enter" && submit(e);
            }}
            placeholder="Write a message"
          />
          <AuthButton text="Send" />
        </form>
        <button onClick={logout} className="logout">
          Sign Out
        </button>
      </div>
    </div>
  );
}
