import React, { useEffect, useState } from 'react';
import './formLogIn.css';
// import FormLogIn from './formLogIn';
import Formulario from './form';

import { useNavigate } from "react-router-dom";
const Form = () => {
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   let navigate = useNavigate();


//   useEffect(() => {
//     if (isSubmitted){
//       navigate('/form')
//     }
//   }, [isSubmitted])

//   function submitForm() {
//     setIsSubmitted(true);
//   }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='img/img-3.jpg' alt='spaceship' />
        </div>
          <Formulario/>
        
      </div>
    </>
  );
};

export default Form;