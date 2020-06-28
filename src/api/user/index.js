import axios from "axios";

const userRegister = form =>
  axios.post("/api/v1/user/register", form).then(res => res.data);

const userLogin = form =>
  axios.post(`/api/v1/user/login`, form).then(res => res.data);

const userInfo = axios.get("/api/v1/user/me").then(res => res.data);

const userLogout = Response =>
  axios.delete("/api/v1/logout", Response).then(res => res.data);

export { userRegister, userLogin, userInfo, userLogout };
