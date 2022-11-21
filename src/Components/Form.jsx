import React from "react";

export default function Form(props) {
  return (
    <div
      style={{ width: "100%", minHeight: "100vh" }}
      className="formContainer flex justify-center items-center">
      <form
        onClick={props.onClick}
        onSubmit={props.onSubmit}
        ref={props.form}
        autofill="off"
        autoComplete="off"
        className="authorization flex gap-5 flex-col items-start p-5"
        id='valid'>
        {props.children}
      </form>
    </div>
  );
}
