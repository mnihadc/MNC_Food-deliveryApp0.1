import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useCart, useDispatchCart } from '../Components/CartProvider';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartData = useCart();
  const dispatch = useDispatchCart();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleCheckout = async () => {
    try {
      if (loading || error) {
        throw new Error("User data loading or error occurred.");
      }

      const userEmail = currentUser.email;
      const response = await fetch("/api/listing/orderData", { // Adjust the path here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_data: cartData,
          email: userEmail,
        }),
      });

      if (response.ok) {
        dispatch({ type: "CLEAR" });
        setIsPlacingOrder(true);
        setTimeout(() => {
          navigate("/order");
        }, 2000);
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  let totalPrice = cartData.reduce((total, item) => total + item.price, 0);

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
            {cartData.map((item, index) => (
              <tr key={index} className="text-center align-middle">
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
        <div><h1 className='fs-2'>Total Price: ${totalPrice}</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckout} disabled={isPlacingOrder}>Check Out</button>
        </div>
        {isPlacingOrder && <p>Placing order, please wait...</p>}
      </div>
    </div>
  );
}

export default Cart;
