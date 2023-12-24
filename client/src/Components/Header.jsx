import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';

import ShortPage from '../../shortPage';
import Cart from '../Pages/Cart';
import { useCart } from './CartProvider';

function Header() {
    const { currentUser } = useSelector((state) => state.user)
    const [cartView, setCartView] = useState();
    let Cartdata = useCart();
    return (
        <header className='bg-green-600 shadow-md relative z-10'>
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

                    {currentUser && (
                        <div className='fixed bottom-0 left-0 w-full bg-green-600 p-2 sm:hidden'>
                            <div className='flex justify-around items-center'>
                                <div onClick={() => { setCartView(true) }} className='text-white hover:underline'>
                                    My Cart {""}
                                    <Badge pill bg="danger" >{Cartdata.length}</Badge>
                                </div>
                                <Link to='/order' className='text-white hover:underline'>
                                    Order
                                </Link>
                            </div>
                        </div>
                    )}
                    {currentUser && (
                        <>

                            <div className='hidden sm:inline hover:underline' onClick={() => { setCartView(true) }}>
                                My Cart {""}
                                <Badge pill bg="danger" >{Cartdata.length}</Badge>
                            </div>
                            {cartView ? <ShortPage onClose={() => setCartView(false)}><Cart /></ShortPage> : null}

                            <Link to='/order'>
                                <li className='hidden sm:inline hover:underline'>
                                    Order
                                </li>
                            </Link>
                        </>
                    )}

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
