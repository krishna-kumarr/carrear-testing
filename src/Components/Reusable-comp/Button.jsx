import React from 'react'

const Button = ({onClick, children}) => {
    
  return (
    <>
        <button type='button' onClick={onClick} className='btn btn-success' role='login-button'>{children}</button>
    </>
  )
}

export default Button
