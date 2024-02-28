import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../hooks/useCart';

const Cards = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const [cart, refetch] = useCart();


    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleHeartClick = (e) => {
        e.preventDefault(); // Prevent default behavior to avoid unexpected navigation
        setIsHeartFilled(!isHeartFilled);
    };

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Add to cart button function
    const handleAddtoCart = () => {
        if (user && user.email) {
            const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };

            fetch('http://localhost:6001/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then((res) => res.json())
            .then((data) => {
                        refetch();
                    Swal.fire({
                        position: 'mid',
                        icon: 'success',
                        title: 'Item Added to cart',
                        showConfirmButton: false,
                        timer: 1000
                    });
                
            });
        } else {
            Swal.fire({
                title: 'Please Login',
                text: 'Without an account, you can\'t add products',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sign Up Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/signup');
                }
            });
        }
    };

    return (
        <div className="flex flex-col my-5 card w-96 bg-base-100 shadow-xl relative">
            <div className={`rating gap-1 absolute right-1 top-2 p-4 ${isHeartFilled ? 'text-rose-500' : 'text-white'}`} onClick={handleHeartClick}>
                <FaHeart className="h-5 w-5 cursor-pointer" />
            </div>
            <Link to={`/menu/${item._id}`}></Link>
            <figure>
                <img src={item.image} alt="" className="hover:scale-105 transition-all duration-200 md:h-72" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.recipe}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5 className="font-semibold">
                        <span className="text-sm text-red">$</span>
                        {item.price}
                    </h5>
                    <button className="btn bg-green text-white" onClick={handleAddtoCart}>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default Cards;
