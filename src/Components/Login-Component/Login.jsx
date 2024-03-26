import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [LoginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [LoginErrors, setLoginErrors] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const pageNavigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...LoginDetails, [name]: value });
  };

  const handleSubmit = async() => {
    if (LoginDetails.username === "" || LoginDetails.password === "") {
      setLoginErrors(true);
      setSubmitLoading(false);
    } else {
      setLoginErrors(false);
      setSubmitLoading(true); 
      setTimeout(()=>{
         pageNavigate("/home"); 
      },1000)
    }
  };
  

  return (
    <div className="container">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-5">
          <h1>SignIn to Second carrears</h1>
          <form>
            
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                value={LoginDetails.username}
                placeholder="Username"
                role="username"
                name="username"
                className="form-control"
                onChange={handleChange}
              />
              {LoginErrors && LoginDetails.username==='' ? (
              <p className="text-danger text-center">username required</p>
            ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={LoginDetails.password}
                placeholder="Password"
                role="password"
                name="password"
                className="form-control"
                onChange={handleChange}
              />
              {LoginErrors  && LoginDetails.password==='' ? (
              <p className="text-danger text-center">Password required</p>
            ) : null}
            </div>

            <div className="mb-3">
              {submitLoading ? (
                <button
                  type="button"
                  className="btn btn-success"
                  role="disable-login-button"
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-success"
                  role="login-button"
                >
                  Login
                </button>
              )}
            </div>
            
          </form>
          <Link to='/forgot_password' data-testid='forgot-password'>Forgot password</Link>

          
          <Link to='/google' data-testid='google'>Google</Link>
          <Link to='/linked-in' data-testid='linked-in'>linked-in</Link>
          <Link to='/apple' data-testid='apple'>apple</Link>


          <Link to='/sign-up' data-testid='sign-up'>sign-up</Link>


        </div>
      </div>
    </div>
  );
};

export default Login;
