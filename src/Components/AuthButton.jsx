import React from "react";

export default function AuthButton(props) {
  return (
    <button ref={props.refe} type="submit" className="authButton font-bold px-4 py-2 place-self-center rounded-lg" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
