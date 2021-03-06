import cookie, { remove } from "js-cookie";
import Router from "next/router";

//set cookie

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1 });
  }
};

//remove cookie

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key);
  }
};

//get cookie
export const getCookie = (key, req) => {
  // if (process.browser) {
  //   return cookie.get(key);
  // }
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key) => {
  console.log("From browser");
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  console.log("From Server");
  if (!req.headers.cookie) {
    return undefined;
  }
  let token = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));

  if (!token) {
    return undefined;
  }
  let tokenValue = token.split("=")[1];
  console.log("tokenValue" + tokenValue);
  return tokenValue;
};

//set in localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

//remove from localStorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      }
    }
  }
  return false;
};

export const logout = () => {
  removeCookie("token");
  removeLocalStorage("user");
  Router.push("/login");
};
