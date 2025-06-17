import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner';
import { useFormik } from 'formik';
import {TextField} from '@mui/material';
import * as Yup from 'yup';

const Signup = () => {

  const baseUrl = "https://server-ecom-rho.vercel.app";
  const formik = useFormik({
    initialValues:{
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
    }),

    onSubmit: async(values) => {
      console.log(values)
       const { firstName, lastName, email, password } = formik.values;
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoader(true)
      const res = await axios.post(`${baseUrl}/signup`, {
        firstName,
        lastName,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success("successfully User Created");
      console.log("Signup Response:", res.data);
      setLoader(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Signup Error:", error.response?.data?.message || error.message);
      setLoader(false)
    }
    }
  });




  return (
    <>
      <Toaster position="top-center" richColors />
      <div>
        <form onSubmit={formik.handleSubmit}>
            <TextField
            label="First Name"
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.error.firstName}
            />

        </form>
      </div>
    </>
  );
};

export default Signup;
