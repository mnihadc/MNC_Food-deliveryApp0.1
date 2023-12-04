import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


function Header() {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <header className='bg-green-600 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm:text-xl flex flex-wrap text-lg'>
                        <span className='text-blue-950'>MNC</span>
                        <span className='text-yellow-700'>_FOOD-</span>
                        <span className='text-red-700'>Order</span>
                        <span className='text-gray-500'>And</span>
                        <span className='text-red-700'>Delivery</span>
                    </h1>
                </Link>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline  hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link to='/cart'>
                        <li className='hidden sm:inline  hover:underline'>
                            Cart
                        </li>
                    </Link>
                    <Link to='/order'>
                        <li className='hidden sm:inline  hover:underline'>
                            Order
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline  hover:underline'>
                            About
                        </li>
                    </Link>
                    <Link to={currentUser ? '/profile' : '/sign-in'}>
                        {currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
                        ) : (
                            <span className='text-slate-700 hover:underline'>Sign-In</span>
                        )}
                    </Link>

                </ul>
            </div>
        </header >
    )
}

export default Header
