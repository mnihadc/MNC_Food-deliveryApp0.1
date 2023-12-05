import React from 'react'


function Card() {
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "560px" }}>
                    <img className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">card-title</h5>
                        <p className="card-text">card-text</p>
                        <div className="container w-100">
                            <select className='m-2 h-100 bg-success rounded' name="" id="">


                                <option>options-1</option>
                                <option>options-2</option>
                                <option>options-3</option>


                            </select>

                            <select className='m-2 h-100 bg-success rounded'>

                                <option>101</option>
                                <option>102</option>
                                <option>103</option>

                            </select>

                            <div className='d-inline h-100 fs-5'>
                                10001
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <button className={`btn btn-success justify-center ms-2`}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card;
