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
export const authentication = async (usernameemail, password) => {
  let users = await getUsers();
  let exists = false;
  let userr;
  users.forEach((user) => {
    user.username === usernameemail && (exists = true);
    user.email === usernameemail && (exists = true);
    if (exists) {
      userr = user;
    }
  });
  if (exists && sha256(password) === userr.password) {
    return "valid";
  } else if (exists && sha256(password) !== userr.password) {
    return "invalid";
  } else {
    return "notexists";
  }
};
export const findUser = async (usernameemail, password) => {
  let users = await getUsers();
  let exists = false;
  let userr;
  users.forEach((user) => {
    user.username === usernameemail && (exists = true);
    user.email === usernameemail && (exists = true);
    if (exists) {
      userr = user;
    }
  });
  return userr.username;
};
export const getChat = async () => {
  let chat;
  await axios.get(`${REACT_APP_API}/chat`).then((res) => {
    chat = res.data;
  });
  return chat;
};
