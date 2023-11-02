import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/sign-in',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData)
        })
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg' onChange={handleChange} />
        <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg' onChange={handleChange} />
        <button className='bg-green-700 p-3 rounded-lg text-white font-semibold uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Sign In"}</button>
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Dont have account</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn
