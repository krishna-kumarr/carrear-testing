import React from 'react'

const LoginStates = () => {
    const [LoginDetails, setLoginDetails] = React.useState({
        username: '',
        password: ''
    });

    const [LoginErrors, setLoginErrors] = React.useState(false);
    const [submitLoading, setSubmitLoading] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({ ...LoginDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
     
        setLoginErrors(true)
        // if(LoginDetails.username || LoginDetails.password){
        //     setLoginErrors(true)
        //     setSubmitLoading(true)
        // }
        // else{
        //     setLoginErrors(false)
        //     setSubmitLoading(false)
        // }
    };

    return {
        LoginDetails,
        setLoginDetails,
        LoginErrors,
        setLoginErrors,
        submitLoading,
        setSubmitLoading,
        handleChange,
            handleSubmit
    }
}

export default LoginStates