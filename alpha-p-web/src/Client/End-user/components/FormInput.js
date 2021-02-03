import React from "react";

const FormInput = ({ register, errors, label, id, ...inputProps }) => {
  return (
    <div >
      <label htmlFor={id}>{label}</label>
      <input className="FormInput" ref={register} id={id} {...inputProps} />
      {errors && <div>{errors.message}</div>}
    </div>
  );
};



const FormDevider = () => {
  return (
    <div className='formDevider'>
      <div/>
      <p>or</p>
      <div/>
    </div>
  )
}

export  {FormDevider,FormInput}
