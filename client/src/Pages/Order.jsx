import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Order() {
  const [orderData, setOrderData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const userEmail = currentUser.email;

  const fetchMyOrder = async () => {
    try {
      const response = await fetch(`/api/listing/userOrder/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const responseData = await response.json();
      console.log('Fetched order data:', responseData);
      if (Array.isArray(responseData.orderData)) {
        setOrderData(responseData.orderData);
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const isNewOrder = (orderDate) => {
    const currentDate = new Date();
    const orderDateTime = new Date(orderDate);

    const oneHourLater = new Date(orderDateTime);
    oneHourLater.setHours(oneHourLater.getHours() + 1);
    return currentDate < oneHourLater;
  };

  return (
    <div className='container pb-4'>
      <h2 className='pt-2 font-semibold'>Order</h2>
      <div className='text-center'>
        {orderData && orderData.length > 0 ? (
          <>
            {/* Display new orders */}
            {orderData.map((order, orderIndex) => (
              <div key={orderIndex} className='m-3'>
                {order.order_data.map((orderItems, itemIndex) => (
                  isNewOrder(orderItems[0].order_date) && (
                    <div key={itemIndex} className='m-auto mt-5 font-bold'>
                      {new Date(orderItems[0].order_date).toLocaleString()} {/* Display order date */}
                      <span className='text-2xl font-semibold text-green-500'> (New Order)</span>
                      <hr />
                      <div className='flex flex-col text-center d-inline-block'>
                        {orderItems.map((item, subItemIndex) => (
                          <div key={subItemIndex} className='card mt-3' style={{ width: '20rem', height: '23rem' }}>
                            <img src={item.img} alt={item.name} className='card-img-top ' />
                            <div className='card-body'>
                              <h4 className='card-title font-semibold text-center text-lg'>{item.name}</h4>
                              <div className='container w-100 p-0'>
                                <span>Quantity: {item.qty}</span>
                                <br />
                                <span>Size: {item.size}</span>
                                <br />
                                <span>Order delivery in 1 hour </span>
                                <br />
                                <span>₹ {item.price}/-</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            ))}
            {/* Display old orders */}
            {orderData.map((order, orderIndex) => (
              <div key={orderIndex} className='m-3'>
                {order.order_data.map((orderItems, itemIndex) => (
                  !isNewOrder(orderItems[0].order_date) && (
                    <div key={itemIndex} className='m-auto mt-5 font-bold'>
                      {new Date(orderItems[0].order_date).toLocaleString()} {/* Display order date */}
                      <span className='text-2xl font-semibold text-red-500'> (Old Order)</span>
                      <hr />
                      <div className='flex flex-col text-center d-inline-block'>
                        {orderItems.map((item, subItemIndex) => (
                          <div key={subItemIndex} className='card mt-3' style={{ width: '20rem', height: '23rem' }}>
                            <img src={item.img} alt={item.name} className='card-img-top ' />
                            <div className='card-body'>
                              <h4 className='card-title font-semibold text-center text-lg'>{item.name}</h4>
                              <div className='container w-100 p-0'>
                                <span>Quantity: {item.qty}</span>
                                <br />
                                <span>Size: {item.size}</span>
                                <br />
                                <span>Order delivery in 1 hour </span>
                                <br />
                                <span>₹ {item.price}/-</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            ))}
          </>
        ) : (
          <h2 className='text-3xl font-semibold p-3'>No orders available</h2>
        )}
      </div>
    </div>
  );
}

export default Order;
