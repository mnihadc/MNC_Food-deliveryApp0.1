import React, { useEffect, useState } from 'react';

function Order() {
  const [orderData, setOrderData] = useState("");

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("/api/listing/userOrder", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });
      const responseData = await response.json();
      setOrderData(responseData);
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
    <div>
      <div className='container'>

        <div className='text-center'>
          {orderData && Object.keys(orderData).length !== 0 ? (
            orderData.orderData && orderData.orderData.order_data?.length > 0 ? (
              <>
                {orderData.orderData.order_data?.reverse().map(data => (
                  data.map((arrayData) => (
                    <div key={arrayData.order_id} className='m-3'>
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
                  ))
                ))}
              </>
            ) : (
              <h2 className='text-3xl font-semibold p-3'>No orders availables</h2>
            )
          ) : (
            <h2>No orders available</h2>
          )}
        </div>

      </div>
    </div>
  );
}

export default Order;
