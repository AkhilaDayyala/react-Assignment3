import React from 'react'
import { Formik, useFormik } from 'formik'

function FormikForm() { 
    const initialValues={
        name:"",
        email:""
    }
    const validate=(values)=>{
        console.log(values)
        let errors={};
        if(!values.name){
            errors.name="Required";

        }
        if(!values.email){
            errors.email="Required";
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
            errors.email = "Email is not valid";
        }
        return errors;
    }
    const onSubmit=(values)=>{
        console.log("form submitted")
      
    }
    const Formik=useFormik({initialValues, validate, onSubmit})
  return (
    <div>
      <form onSubmit={Formik.handleSubmit}>
        <label for="name"> Enter your name: </label>
        <input type='text' name='name' id='name' value={Formik.values.name} onChange={Formik.handleChange}></input>
        <p>{Formik.errors.name ? Formik.errors.name : ""}</p>
        <label for="email">Enter your Email:</label>
        <input type='email' name='email' id='email' value={Formik.values.email}  onChange={Formik.handleChange}></input>
        <p>{Formik.errors.email ? Formik.errors.email : ""}</p>
        <button type='submit'>Submit</button>

      </form>
    </div>
  )
}

export default FormikForm
