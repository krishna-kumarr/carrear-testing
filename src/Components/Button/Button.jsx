import React from 'react'

const Button = ({type,classname,testId,title}) => {
  return (
    <button type={type} className={classname} data-testid={testId}>
        {title}
    </button>
  )
}

export default Button
