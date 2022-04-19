import React, { useEffect, useState } from "react";
import register_validate from "./../../Functions/Register_Validate";

function Login() {
  const [formerrors, setFormErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [key]: value });
    
  };
  const handleUser = (e) => {
    e.preventDefault();
    setFormErrors(register_validate(user));
    setisSubmit(true);
  };
  return (
    <div onSubmit={handleUser}>
      <div className="Auth-form">
        <div className="Auth-form__items">
          <label className="Auth-form__label">Email</label>
          <input
            type="text"
            className="Auth-form__inputs"
            name="email"
            onChange={handleInput}
          ></input>
          <p className="Auth-form__error">{formerrors.email}</p>
        </div>
        <div className="Auth-form__items">
          <span className="Auth-form__label">Password</span>
          <input
            className="Auth-form__inputs"
            type="password"
            name="password"
            onChange={handleInput}
          />
        </div>
        <div className="Auth-form__items">
          <button
            type="button"
            className="Auth-button Auth-form-button"
            onClick={handleUser}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
