import React from 'react'
import { Link } from 'react-router-dom';

function SignUp() {
  return (
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
        <form action="" className='flex flex-col gap-4'>
          <input type="text" id='username' placeholder='username' className='border p-3 rounded-lg' />
          <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg' />
          <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg' />
          <button className='bg-green-700 font-semibold  rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80 text-white'>Sign-up</button>
        </form>
        <div className='flex gap-2 mt-5'>
          <p>Have a account?</p>
          <Link to={'/sign-in'}>
            <span className='text-blue-700'>sign-in</span></Link>
        </div>
      </div>
  )
}

export default SignUp;
