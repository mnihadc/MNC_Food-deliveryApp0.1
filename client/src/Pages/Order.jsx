import React, { useEffect, useState } from 'react';
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
      const responseData = await response.json();
      setOrderData(responseData.orderData);
      console.log(responseData); 
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

    orderDateTime.setHours(orderDateTime.getHours() + 1, orderDateTime.getMinutes() + 30);

    return orderDateTime > currentDate;
  };

  return (
    <div className='container'>
      <h2 className='pt-2 font-semibold'>Order</h2>
      <div className='text-center'>
        {orderData.length > 0 ? (
          orderData.map(order => (
            <div key={order._id} className='m-3'>
              {order.order_data.map(arrayData => (
                <div key={arrayData.order_id}>
                  {arrayData.order_date ? (
                    <div className='m-auto mt-5 font-bold'>
                      {arrayData.order_date} {arrayData.order_time}
                      {isNewOrder(arrayData.order_date) ? (
                        <span className='text-2xl font-semibold text-green-500'> (New Order)</span>
                      ) : (
                        <span className='text-2xl font-semibold text-red-500'> (Old Order)</span>
                      )}
                      <hr />
                    </div>
                  ) : (
                    <div className='flex flex-col text-center d-inline-block ' key={arrayData.id}>
                      <div className="card mt-3" style={{ width: "20rem", height: "20rem" }}>
                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "10rem", objectFit: "fill" }} />
                        <div className="card-body">
                          <h4 className="card-title font-semibold text-center text-lg">{arrayData.name}</h4>
                          <div className='container w-100 p-0' style={{ height: "38px" }}>
                            <span className='m-1'>Quantity: {arrayData.qty} </span>
                            <span className='m-1'>Portion: {arrayData.size} </span>
                            <h5 className='m-1'>Order delivery in 1 hour </h5>
                            <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                              ₹ {arrayData.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <h2 className='text-3xl font-semibold p-3'>No orders available</h2>
        )}
      </div>
    </div>
  );
}

export default Order;
