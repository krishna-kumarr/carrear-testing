import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginStates = () => {
  const [LoginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
  });

  const [LoginErrors, setLoginErrors] = React.useState(false);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const pageNavigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...LoginDetails, [name]: value });
  };

  const handleSubmit = () => {
    if (LoginDetails.username === "" || LoginDetails.password === "") {
      setLoginErrors(true);
      setSubmitLoading(false);
    } else {
      setLoginErrors(false);
      setSubmitLoading(true);
      pageNavigate("/home");
    }
  };


  return {
    LoginDetails,
    setLoginDetails,
    LoginErrors,
    setLoginErrors,
    submitLoading,
    setSubmitLoading,
    handleChange,
    handleSubmit,
    pageNavigate
  };
};

export default LoginStates;
