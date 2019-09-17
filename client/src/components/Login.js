import React, { useState } from "react";
import axios from "axios";

const LoginForm = props => {
  console.log("loginform props:", props);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = e => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    axios
      .post("http://localhost:6500/api/login", form, { withCredentials: true })
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch(err => console.error(err.response));
  };

  return (
    <div>
      <form onSubmit={login}>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="username"
          value={form.username}
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
        />
        <button onClick={login}>Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
