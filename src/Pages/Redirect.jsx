import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const { REACT_APP_TOKEN } = process.env;
export default function Redirect() {
  let navigate = useNavigate();
  useEffect(() => {
    if (window.sessionStorage.getItem(REACT_APP_TOKEN) === "true") {
      navigate("/chat-frontend/chat");
    } else {
      if (!window.sessionStorage.getItem(REACT_APP_TOKEN)) {
        navigate("/chat-frontend/login");
      }
    }
  });
  return <div>Redirect</div>;
}
