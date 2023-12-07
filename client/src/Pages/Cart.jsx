import React from 'react'

import { useCart, useDispatchCart } from '../Components/CartProvider';

function Cart() {
  let Cartdata = useCart();
  let dispatch = useDispatchCart();


  

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
            </tr>
          </thead>
          <tbody>
            {Cartdata.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.size}</td>
                <td>${item.price}</td>
                <td><button type='button' className='btn p-0'><img src='' alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price:25531465/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' >Check Out</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
