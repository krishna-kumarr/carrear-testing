import React, { useState } from 'react'

const Forgot = () => {
  const [emailInput,setemailInput]=useState({email:''})
  const [err,setErr]=useState(false)

  const handleEmailData = (e)=>{
      setemailInput({...emailInput,[e.target.name]:e.target.value})
  }

  const handleValidateEmail = () =>{
      if(emailInput.email===''){
          setErr(true)
      }else{
          setErr(false)
      }
  }

  return (
    <div className='container'>
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-5">
          <h1>Forgot password</h1>
          
          <form>
            <div className="mb-3">
              <label className='form-label'>Email verification</label>
              <input type="email" className='form-control' value={emailInput.email} data-testid="email" name='email' onChange={handleEmailData}/>
              {err && emailInput.email==='' ? <p className='text-danger'>Email required</p> : null}
            </div>
            <div className="mb-3">
              <button type="button" className='btn form-control btn-success' data-testid="verify-email" onClick={handleValidateEmail}>Verify</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forgot
