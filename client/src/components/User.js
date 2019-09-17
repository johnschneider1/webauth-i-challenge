import React from "react";

const User = props => {
  console.log("demo:", props);
  return (
    <div className="User-container">
      <h3>Name: {props.user.name}</h3>
    </div>
  );
};

export default User;
