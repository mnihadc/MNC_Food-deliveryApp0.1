import React from 'react'
import { FaTrashAlt } from 'react-icons/fa/index';

import { useCart, useDispatchCart } from '../Components/CartProvider';

function Cart() {
  let Cartdata = useCart();
  let dispatch = useDispatchCart();
  if (Cartdata.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");

    console.log("Retrieved userEmail from localStorage:", userEmail);

    
    if (!userEmail) {
      console.error("User email is null or undefined.");
      return;  
    }

    let orderDateTime = new Date().toLocaleString();
    let response = await fetch("/api/listing/orderData", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: Cartdata,
        email: userEmail,
        order_date: orderDateTime
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  }

  let totalPrice = Cartdata.reduce((total, item) => total + item.price, 0)

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col'>Image</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Cartdata.map((item, index) => (
              <tr key={item.id} className="text-center align-middle">
                <td>{index + 1}</td>
                <td><img className='w-[75px] h-[50px]' src={item.img} alt="img..." /></td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.size}</td>
                <td>${item.price}</td>
                <td><button type='button' className='btn p-0' onClick={() => { dispatch({ type: "REMOVE", index: index }) }}> <FaTrashAlt /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price:{totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckout} >Check Out</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
