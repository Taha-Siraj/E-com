import React from 'react';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';

const UserSignup = () => (
   <div className='flex justify-center h-screen items-center' >
    <div className='border border-black flex justify-center items-center flex-col w-[350px] min:h-[350px] px-4 py-10 text-center text-xl gap-y-4'>
      <h1 className='flex' >SignUP Form</h1>

     <TextField id="outlined-basic" label='Name' />
     <TextField id="outlined-basic" label='Email' />
     <TextField id="outlined-basic" label='Password' />
     <Button className='border-2 border-blue-500'>SignUP</Button>
      </div>  
   </div>
 );


export default UserSignup;