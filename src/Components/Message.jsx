import React from "react";
import { deleteMessage } from "../Databases";
import Delete from "../Images/delete.svg";
export default function Message(props) {
  async function deleteM() {
    await deleteMessage(props.user, props.date);
  }
  if (props.you) {
    return (
      <div style={{ width: "300px" }} className="message message-you">
        <p>{props.message}</p>
        <span>
          {props.user} &#x2022; {props.time}
        </span>
        <img onClick={deleteM} src={Delete} alt="Delete" className="delete" />
      </div>
    );
  } else {
    return (
      <div style={{ width: "300px" }} className="message">
        <p>{props.message}</p>
        <span>
          {props.user} &#x2022; {props.time}
        </span>
      </div>
    );
  }
}
