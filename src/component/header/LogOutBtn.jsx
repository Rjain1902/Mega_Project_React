import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logOut } from "../../store/authSlice";

function LogOutBtn(props) {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    authService.logout().then(() => {
      dispatch(logOut());
    });
  };

  return (
    <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Log Out
    </button>
  );
}
export default LogOutBtn;
