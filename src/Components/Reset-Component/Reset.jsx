import React, { useState } from 'react'

const Reset = () => {

    const [emailData, setEmailData] = useState("")
    const [err, setErr] = useState(false)
    const [errMessage,setErrMessage] = useState("")
    const [passwordDetails, setpasswordDetails] = useState({
        password: '',
        confirm_password: ''
    })

    const handlePasswordSet = (e) => {
        setpasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value })
    }

    const handleSubmitPassword = () => {
        if (passwordDetails.password === '' || passwordDetails.confirm_password === '') {
            setErr(true)
        } else {
            if(passwordDetails.password !== passwordDetails.confirm_password){
                setErr(true)
                setErrMessage("password does not matched")
            }else{
                setErr(false) 
                setErrMessage("password matching")
            }
        }
    }


    return (
        <div className='container'>
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-5">
                    <h1>Reset password</h1>

                    <form>
                        {errMessage!=='' ? <p className='text-danger'>{errMessage}</p> : null}
                        <div className="mb-3">
                            <label className='form-label'>Email</label>
                            <input type="email" className='form-control' value={emailData} data-testid="reset-comp-email" name='email' disabled onChange={(e)=>setEmailData(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Password</label>
                            <input type="password" className='form-control' value={passwordDetails.password} data-testid="reset-comp-pass" name='password' onChange={handlePasswordSet} />
                            {err && passwordDetails.password === '' ? <p className='text-danger'>password required</p> : null}
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Confirm password </label>
                            <input type="password" className='form-control' value={passwordDetails.confirm_password} data-testid="reset-comp-conf-pass" name='confirm_password' onChange={handlePasswordSet} />
                            {err && passwordDetails.confirm_password === '' ? <p className='text-danger'>confirm password required</p> : null}
                        </div>

                        <div className="mb-3">
                            <button type="button" className='btn form-control btn-success' data-testid="change-password" onClick={handleSubmitPassword}>Change password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Reset
