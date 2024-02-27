// These are SpecialDishes Cards

import React, { useContext, useState } from 'react'
import {Link, useLoaderData, useLocation, useNavigate} from "react-router-dom"
import {FaHeart} from "react-icons/fa"
import { AuthContext } from '../contexts/AuthProvider';
import Swal from 'sweetalert2'


const Cards = ({item}) => {

    const {name, image,price,recipe,_id} = item;

    const [isHeartFillted,setIsHeartFillted] = useState(false);
    const handleHeartClick = ()=>{
            setIsHeartFillted(!isHeartFillted);
    }
    const {user} = useContext(AuthContext);

    const navigate = useNavigate(); // From react router dom
    const location = useLocation();

    // add to cart btn funtion
    const handleAddtoCart = (item)=>{
        // console.log("item clicked ", item);

        // check if the user is present or not (login ornot)

        if(user && user?.email){
            const cartItem = {menuItemId: _id,name , quantity:1, image,price,email:user.email};
            // console.log(cartItem);
            fetch('http://localhost:6001/carts',{
                method:"POST",
                headers :{
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(cartItem)
            }).then((res)=>res.json()).then((data)=>{
                // console.log(data);
                if(data.insertedId){
                    Swal.fire({
                        position: "mid",
                        icon: "success",
                        title: "Item Added to cart",
                        showConfirmButton: false,
                        timer: 1000
                      });
                      
                }
            })
        }
        else{
            Swal.fire({
                title: "Please Login",
                text: "Without an account can't able to add products",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sign Up Now"
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/signup',{state:{from:location}})
                }
              });
        }

    }

  return (
         <div className="flex m-10 flex-col my-5 card w-96 bg-base-100 shadow-xl relative ">
            <div className={`rating gap-1 absolute right-1 top-2 p-4 heartStar bg-green ${isHeartFillted ? "text-rose-500" : "text-white"}` } onClick={handleHeartClick}>
                <FaHeart className='h-5 w-5 cursor-pointer '/>
            </div>
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
                    <button className="btn bg-green text-white " onClick={()=>handleAddtoCart(item)}>Add to cart</button>
                </div>
            </div>
        </div>
  )
}

export default Cards
