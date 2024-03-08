import React, { useContext, useState } from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';

const CartPage = () => {

    // to fetch cart data of the user
    const [cart, refetch] = useCart();
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    // calculate price
    const calculatePrice = (item) => {
        return item.price * item.quantity;
    }

    // calculate total price
    const cartSubTotal = Array.isArray(cart)
      ? cart.reduce((total, item) => {
          return total + calculatePrice(item);
        }, 0)
      : 0;

    const orderTotal = cartSubTotal;

    // handle Delete item
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            refetch();
            if (result.isConfirmed) {
                fetch(`http://localhost:6001/carts/${item._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };


    // handleIncrease function
    const handleIncrease = (item) => {
        fetch(`http://localhost:6001/carts/${item._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ quantity: item.quantity + 1 })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                const updatedCart = cart.map((cartItem) => {
                    if (cartItem._id === item._id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + 1
                        }
                    }
                    return cartItem;
                })
                refetch();
                setCartItems(updatedCart);
            })
            .catch(error => {
                console.error('Error increasing item quantity:', error);
                // Handle error, show error message, etc.
            });
    }


    // handleDecrease function
    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            fetch(`http://localhost:6001/carts/${item._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ quantity: item.quantity - 1 })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    const updatedCart = cart.map((cartItem) => {
                        if (cartItem._id === item._id) {
                            return {
                                ...cartItem,
                                quantity: cartItem.quantity - 1
                            }
                        }
                        return cartItem;
                    })
                    refetch();
                    setCartItems(updatedCart);
                })
                .catch(error => {
                    console.error('Error decreasing item quantity:', error);
                    // Handle error, show error message, etc.
                });
        }
        else {
            Swal.fire("Item can't be zero");
        }
    }

    return (
        <div className='section-container '>

            {/* Banner */}
            <div className="section-container bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] ">
                <div className="py-36 flex flex-col  justify-center items-center gap-8">

                    {/* Texts */}
                    <div className="space-y-7 px-4">
                        <h2 className="md:text-6xl text-4xl font-bold md:leading-snug leading-snug">
                            Items Added to the {" "}
                            <span className="text-green">Cart</span>
                        </h2>

                    </div>
                </div>
            </div>

            {/* tables for the cart */}

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='bg-green text-white rounded-sm text-lg'>
                            <tr>
                                <th>#</th>
                                <th>Food</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* rows */}
                            {
                                cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="404" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='font-medium'>
                                            {item.name}
                                        </td>
                                        <td>
                                            <button className='btn btn-xs' onClick={() => handleDecrease(item)}>-</button>
                                            <input type="number" value={item.quantity} className='w-10 mx-2 text-center overflow-hidden appearance-none' onChange={(e) => console.log(e.target.value)} />
                                            <button className='btn btn-xs' onClick={() => handleIncrease(item)}>+</button>
                                        </td>
                                        <td>${calculatePrice(item).toFixed(2)}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs bg-red text-white" onClick={() => handleDelete(item)}>
                                                <FaTrash />
                                            </button>
                                        </th>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            {/* customer details and price calculations */}
            <div className="my-12 flex flex-col md:flex-row justify-between items-start">
                <div className="md:w-1/2 space-y-3">
                    <h3 className="font-medium">Customer Details</h3>
                    <p>Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    <p>User_id: {user.uid}</p>
                </div>
                <div className="md:w-1/2 space-y-3">
                    <h3 className="font-medium">Shopping Details</h3>
                    <p>Total Items: {cart.length}</p>
                    <p>Total Price: ${orderTotal.toFixed(2)}</p>
                    <button className="btn bg-green text-white">Proceed to Checkout</button>
                </div>
            </div>

        </div>
    )
}

export default CartPage;
