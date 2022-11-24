import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from "./Pages/Registration";
import reportWebVitals from "./reportWebVitals";
import "./reset.css";
import "./index.css";
import "./styles.scss";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import Redirect from "./Pages/Redirect";
const router = createBrowserRouter([
  { path: "/chat-frontend/", element: <Redirect /> },
  {
    path: "/chat-frontend/registration",
    element: <Registration />,
  },
  {
    path: "/chat-frontend/login",
    element: <Login />,
  },
  {
    path: "/chat-frontend/chat",
    element: <Chat />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
