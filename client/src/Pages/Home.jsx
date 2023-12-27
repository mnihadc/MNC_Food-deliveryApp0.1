import React, { useEffect, useState } from 'react';

import Footer from "../Components/Footer";
import Card from '../Components/Card';


function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("/api/listing/foodData", {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setFoodItem(responseData.foodItems);
      setFoodCat(responseData.foodCategory);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className='carousel-inner' id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <div className="row mb-3" >
                  <div key={data._id} className="fs-3 m-3">
                    {data.categoryName}
                  </div>
                  <hr />
                  {foodItem !== []
                    ? foodItem.filter((item) => (item.CategoryName === data.categoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map((filterItems) => {

                        return (
                          <div key={filterItems._id} className="col-12 col-md-6 col-lg-4">
                            <Card foodItem={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        )
                      }) : <div key="no-data">NO Such Data Found</div>}

                </div>
              )
            })
            : ""
        }

      </div>
      <div> <Footer /> </div>
    </div>
  )
}

export default Home;
