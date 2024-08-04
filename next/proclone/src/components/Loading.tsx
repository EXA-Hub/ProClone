import React from "react";

const Header: React.FC = () => {
  return (
    <div
    // className="flex items-center justify-center h-screen w-screen"
    // style={{ width: "100%" }}
    >
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    </div>
  );
};

export default Header;
