import { useState, useEffect } from "react";

export function useGetUserData() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storageData = localStorage.getItem("evorhei-app");
    if (!storageData) {
      return;
    }
    const userData = JSON.parse(storageData);
    setToken(userData?.token);
    setUser(userData?.user);
    setIsLogin(userData?.isLogin);
  }, []);

  return [token, user, isLogin];
}
