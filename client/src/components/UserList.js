import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWIthAuth";
import User from "./User";
import Register from "./Register";

const FriendList = props => {
  console.log("friendlist props:", props);
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosWithAuth()
      .get("http://localhost:6500/api/users")
      .then(res => {
        setFriend(res.data);
        props.history.push("/protected");
      })
      .catch(err => console.error("error here:", err));
  };

  const addFriend = name => {
    axiosWithAuth()
      .post("http://localhost:6500/api/users", name)
      .then(res => {
        setFriend(res.data);
      })
      .catch(err => console.error(err.response));
  };

  return (
    <div className="friend-list">
      <h1>list</h1>
      <Register addFriend={addFriend} />

      {friend.map(friend => (
        <User key={friend.name} friend={friend} />
      ))}
    </div>
  );
};

export default FriendList;
