import React, { useEffect } from "react";
import { useNavigate } from "react-router";
const { REACT_APP_TOKEN } = process.env;
export default function Chat() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!window.sessionStorage.getItem(REACT_APP_TOKEN)) {
      navigate("/login");
    }
  });
  return <div>Chat</div>;
}
