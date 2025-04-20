import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UserSignup = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm your password')
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const onSubmit = (values) => {
    console.log('Form Submitted:', values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1e2f] to-[#13131a] px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wider">
          Sign Up
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="min-h-[20px] mt-1">
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-400 text-sm">{formik.errors.name}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="min-h-[20px] mt-1">
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-400 text-sm">{formik.errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="min-h-[20px] mt-1">
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-400 text-sm">{formik.errors.password}</p>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="min-h-[20px] mt-1">
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="text-red-400 text-sm">{formik.errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white rounded-xl font-semibold tracking-wider shadow-md hover:shadow-lg active:scale-95"
              >
                Create Account
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserSignup;
