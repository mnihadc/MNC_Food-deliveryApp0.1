import React from 'react'
import Card from '../Components/Card'
import Carousel from '../Components/Carousel'
import Footer from '../Components/Footer'

function Home() {
  return (

    <div className=''>
      <div>
        <Carousel />
      </div>
      <div className='container'>

        <div className="col-12 col-md-6 col-lg-4 p-3">
          <Card

          ></Card>
        </div>

      </div>
      <div className='pt-5'><Footer /></div>

    </div>

  )
}

export default Home
