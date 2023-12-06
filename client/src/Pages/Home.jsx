import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import Carousel from '../Components/Carousel';
import Footer from '../Components/Footer';

function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

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
      console.log(responseData.foodItems);
      console.log(responseData.foodCategory);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div className=''>
      <div>
        <Carousel />
      </div>
      <div className='container'>
        {foodCat.length !== 0 &&
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3">{data.categoryName}</div>
              <hr />
              {foodItem.length !== 0
                ? foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.categoryName &&
                      item.name.toLowerCase().includes(search.toLocaleLowerCase())
                  )
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-4 p-3">
                      <Card foodItem={filterItems} options={filterItems.options[0]}></Card>
                    </div>
                  ))
                : <div key="no-data">NO Such Data Found</div>}
            </div>
          ))}
      </div>
      <div className='pt-5'><Footer /></div>
    </div>
  );
}

export default Home;
