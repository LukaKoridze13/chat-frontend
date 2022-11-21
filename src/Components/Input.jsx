import React from "react";
import wrong from "../Images/cross.png";
export default function Input(props) {
  if (props.error === "") {
    return (
      <div id="inpValid" style={{ width: "100%" }} onClick={props.onClick}>
        <label
          className="font-bold"
          htmlFor={props.id}
          style={{ display: "block" }}>
          {props.label}
        </label>
        <input
          type={props.type}
          id={props.id}
          name={props.id}
          style={{ display: "block", width: "100%" }}
          placeholder={props.placeholder}
          className="rounded-lg p-1"
        />
        {props.error !== "" && (
          <p>
            <img src={wrong} alt="wrong" />
            {props.error}
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div id="inpNotvalid" style={{ width: "100%" }} onClick={props.onClick}>
        <label
          className="font-bold"
          htmlFor={props.id}
          style={{ display: "block" }}>
          {props.label}
        </label>
        <input
          type={props.type}
          id={props.id}
          name={props.id}
          style={{ display: "block", width: "100%" }}
          placeholder={props.placeholder}
          className="rounded-lg p-1"
        />
        {props.error !== "" && (
          <p>
            <img src={wrong} alt="wrong" />
            {props.error}
          </p>
        )}
      </div>
    );
  }
}
