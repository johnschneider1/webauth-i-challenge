import React from "react";

const User = props => {
  console.log("demo:", props);
  return (
    <div className="friend-container">
      <h3>Name: {props.friend.name}</h3>
    </div>
  );
};

export default User;
