import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './CartProvider';

function Card(props) {
    const dispatch = useDispatchCart();
    const Cartdata = useCart();
    const priceRef = useRef();
    const options = props.options;
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0]); 

    const handleAddToCart = async () => {
        const food = Cartdata.find(item => item.id === props.foodItem._id);
        const finalPrice = qty * parseInt(options[size]);
        
        if (food && food.size === size) {
            await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        } else {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, img: props.foodItem.img, price: finalPrice, qty: qty, size: size });
        }
    };

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div className="col-12 col-md-4 mb-3">
            <div className="card mt-3" style={{ maxHeight: "560px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title font-semibold text-1xl">{props.foodItem.name}</h5>
                    <p className="card-text">{props.foodItem.description}</p>
                    <div className="container w-100">
                        <select className='m-2 h-100 bg-success rounded' value={qty} onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (_, i) => (
                                <option value={i + 1} key={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} value={size} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{qty * parseInt(options[size])}/-
                        </div>
                    </div>
                    <hr />
                    <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart} >Add to cart</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
