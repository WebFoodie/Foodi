import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useQuery } from "@tanstack/react-query";

const Order = () => {
     const { user } = useAuth();
  const token = localStorage.getItem('access-token');
  
     const { refetch, data: orders = [] } = useQuery({
       queryKey: ["orders", user?.email],
       queryFn: async () => {
      
         const res = await fetch(
           `https://complete-foodi-server-2e4j.onrender.com/payments?email=${user?.email}`,
           {
             headers: {
               authorization: `Bearer ${token}`,
             }
           }
         );
         return res.json();
       },
     });
  console.log("hii")
  console.log(orders)
  console.log("hello")
  return (
    <div className="max-w-screen-2xl container mex-auto xl:px-24 px-4">
      {" "}
      {/* Banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] ">
        <div className="py-36 flex flex-col  justify-center items-center gap-8">
          {/* context */}
          <div className="space-y-7 px-4">
            <h2 className="md:text-6xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your <span className="text-green">Orders!</span>
            </h2>
          </div>
        </div>
      </div>
     
        </div>
     
  );
}
export default Order;