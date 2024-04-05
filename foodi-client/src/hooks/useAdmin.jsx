import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    refetch,
    data: isAdmin,
    isPending: isAdminLoading,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`https://complete-foodi-server-2e4j.onrender.com/users/admin/${user?.email}`);
      console.log(res+"Hell0");
      res.data.admin = true;
      console.log(res + "Hello2");
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
