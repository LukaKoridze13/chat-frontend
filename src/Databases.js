import axios from "axios";
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
