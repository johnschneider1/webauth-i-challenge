import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWIthAuth";
import User from "./User";
import Register from "./Register";

const UserList = props => {
  console.log("friendlist props:", props);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axiosWithAuth()
      .get("http://localhost:6500/api/users", { withCredentials: true })
      .then(res => {
        setUser(res.data);
        props.history.push("/protected");
      })
      .catch(err => console.error("error here:", err));
  };

  const addUser = name => {
    axiosWithAuth()
      .post("http://localhost:6500/api/register", name, {
        withCredentials: true
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.error(err.response));
  };

  return (
    <div className="friend-list">
      <h1>list</h1>
      <Register addUser={addUser} />

      {user.map(user => (
        <User key={user.name} user={user} />
      ))}
    </div>
  );
};

export default UserList;
