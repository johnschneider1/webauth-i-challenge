import React, { useState } from "react";

const Form = props => {
  const [name, setName] = useState({ username: "", password: "" });

  const handleChange = e => {
    setName({ ...name, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.addFriend(name);
  };

  return (
    <div>
      <h1>Who Doesn't Love a Good Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={name.username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          value={name.password}
          placeholder="password"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
