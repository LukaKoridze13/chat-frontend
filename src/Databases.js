import axios from "axios";
import { sha256 } from "js-sha256";
const { REACT_APP_API } = process.env;
export const getUsers = async () => {
  let users;
  await axios.get(`${REACT_APP_API}/users`).then((res) => {
    users = res.data;
  });
  return users;
};
export const checkEmail = async (email) => {
  let users = await getUsers();
  let exists = false;
  users.forEach((user) => {
    user.email === email && (exists = true);
  });
  if (exists) {
    return true;
  } else {
    return false;
  }
};
export const checkUsername = async (username) => {
  let users = await getUsers();
  let exists = false;
  users.forEach((user) => {
    user.username === username && (exists = true);
  });
  if (exists) {
    return true;
  } else {
    return false;
  }
};
export const authentication = async (username, password) => {
  let users = await getUsers();
  let userr = "none";
  users.forEach((user) => {
    if (user.username === username && user.password === sha256(password)) {
      userr = user;
    } else if (
      user.username === username &&
      user.password !== sha256(password)
    ) {
      userr = "wrong";
    }
  });
  if (userr === "none") {
    return "notexists";
  } else if (userr === "wrong") {
    return "invalid";
  } else {
    return "valid";
  }
};
export const getChat = async () => {
  let chat;
  await axios.get(`${REACT_APP_API}/chat`).then((res) => {
    chat = res.data;
  });
  return chat;
};
export const deleteMessage = async (id) => {
  console.log("Start");
  await axios.delete(`${REACT_APP_API}/chat`, { data: { _id: id } });
  console.log("End");
};
