import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("i18nextLng", "en");
    navigate("/");
    return () => {};
  }, []);

  return <div></div>;
}
