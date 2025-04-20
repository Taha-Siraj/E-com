import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UserSignup = () => {

  const validationSchema = Yup.object({ 
    name: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required')
      .lowercase(),
    password: Yup.string()
      .required('Required'),
    confirmPassword: Yup.string()
      .required('Required')
  });

  const initialValues = {
    name: 'Taha Siraj',   
    email: 'piakchugaming899@gmail.com',
    password: '1234.com',
    confirmPassword: '1234.com'
  };  

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <div>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <input 
              type="text"
              placeholder='Name'
              name='name'
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              className='border border-black'
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}

            <br /><br />

            <input
              type="email"
              placeholder='Email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              className='border border-black'
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <br /><br />

            <input
              type="password"
              name='password'
              placeholder='Password'
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              className='border border-black'
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <br />

            <input
              type="password"
              name='confirmPassword'
              placeholder='Confirm Password'
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              className='border border-black'
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}
            <br />
             
            <button 
              className='py-1 px-2 rounded-lg border active:scale-95 border-black' 
              type='submit'
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default UserSignup
