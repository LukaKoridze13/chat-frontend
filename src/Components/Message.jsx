import React from "react";

export default function Message(props) {
  if (props.you) {
    return (
      <div style={{ width: "300px" }} className="message message-you">
        Message: {props.message} <br /> | Sender: {props.user} | Time:{" "}
        {props.time}
      </div>
    );
  } else {
    return (
      <div style={{ width: "300px" }} className="message">
        Message: {props.message} <br /> | Sender: {props.user} | Time:{" "}
        {props.time}
      </div>
    );
  }
}
