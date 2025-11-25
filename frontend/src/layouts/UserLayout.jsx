import React from "react";
import UserNavbar from "../components/Navbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <div style={{ paddingTop: "80px" }}>
        {children}
      </div>
    </>
  );
};

export default UserLayout;
