import { LOCAL_STORAGE } from "./constants";

export const removeToken = () => {
    localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
  };
  