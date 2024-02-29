import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdDashboard, MdDashboardCustomize, MdSpaceDashboard } from "react-icons/md";
import { FaEdit, FaLocationArrow, FaPlusCircle, FaQuestionCircle, FaRegUser, FaShoppingBag, FaUsers } from 'react-icons/fa';
import logo from "/logo.png"
import { FaCartShopping } from 'react-icons/fa6';

const sharedLink = (
    <>
        <li className='mt-3'>
            <Link to='/'><MdDashboard /> HOME</Link>
        </li>
        <li>
            <Link to='/'><FaCartShopping /> Menu</Link>
        </li>
        <li>
            <Link to='/'><FaLocationArrow /> Orders Tracking</Link>
        </li>
        <li>
            <Link to='/'><FaQuestionCircle /> Customer Support</Link>
        </li>
    </>
)

const DashboardLayout = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">

                    <div className='flex items-center justify-between lg:hidden'>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><MdDashboardCustomize /></label>
                        <button className='btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden'> <FaRegUser />Logout</button>
                    </div>

                    <div className='mt-5 md:mt-2 mx-4'>
                        <Outlet /> {/* This will render the nested routes */}
                    </div>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                        <li>
                            <Link to="/" className='flex justify-start mb-3'>
                                <img src={logo} alt="" className='w-20' />
                                <span className='badge badge-primary'>admin</span>
                            </Link>
                        </li>
                        <hr />
                        <li className='mt-3'>
                            <Link to="/dashboard">
                                <MdDashboard />  Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                <FaShoppingBag />  Manage Booking</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                <FaPlusCircle />  Add Menu</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                <FaEdit />  Manage Items</Link>
                        </li>

                        <li className='mb-3'>
                            <Link to="/dashboard/users">
                                <FaUsers />All Users</Link>
                        </li>
                        <hr />
                        {/* Shared nav links */}
                        {
                            sharedLink
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout; // Export the component without specifying its name
