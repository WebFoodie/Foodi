// These are SpecialDishes Cards

import React from 'react'
import {Link} from "react-router-dom"

const Cards = ({item}) => {
  return (
         <div className="flex flex-col my-5 card w-96 bg-base-900 shadow-xl">
            <Link to={`/menu/${(item._id)}`}></Link>
            <figure>
                <img src={item.image} alt="" className='hover:scale-105 transition-all duration-200 md:h-72'/>
            </figure>
            {/* <figure><img src={item.image} alt="food" /></figure> */}
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.recipe}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className='font-semibold '><span className='text-sm text-red'>$</span>{item.price}</h5>
                    <button className="btn bg-green text-white ">Buy Now</button>
                </div>
            </div>
        </div>
  )
}

export default Cards
