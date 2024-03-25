import React from "react";
import useLoginStates from "./LoginStates";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    LoginDetails,
    setLoginDetails,
    LoginErrors,
    setLoginErrors,
    submitLoading,
    setSubmitLoading,
    handleChange,
    handleSubmit
  } = useLoginStates();

  

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
