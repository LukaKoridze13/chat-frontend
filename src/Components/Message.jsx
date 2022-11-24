import React from "react";

export default function Message(props) {
  if (props.you) {
    return (
      <div style={{ width: "300px" }} className="message message-you">
        <p>{props.message}</p>
        <span>
          {props.user} {props.time}
        </span>
      </div>
    );
  } else {
    return (
      <div style={{ width: "300px" }} className="message">
        {props.message}
      </div>
    );
  }
}
