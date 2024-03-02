const e = require("express");
const User = require("../models/User");

// get all users
const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const createUser = async(req,res) => {
    const user = req.body;
    const query = {email: user.email}
    try{
        const existingUser = await User.findOne(query);
        if(existingUser){
            return res.status(302).json({message:"User already exists!"})
        }
        const res = await User.create(user);
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
};

// deleteUser
const deleteUser = async (req,res)=>{
    const userId = req.param.id;
    try{
        const deleteduser = await User.findByIdAndDelete(userId);
        if(!deleteUser){
            return res.status(404).json({message : "User not found"});
        }
        res.status(200).json({message : "User deleted successfully"})
    }
    catch (error){
        res.status(500).json({message : error.message});
    }
}

// get admin

const getAdmin = async(req,res)=>{
    const email = req.params.email;
    const query = {email : email};
    try{
        const user = await User.findOne(query);
        if(email !== req.decode.email){
            return res.status(403).send({message : "Forbidden"})
        }
        let admit = false;
        if(user){
            admin = user?.role ==="admin";
        }
        res.status(200).json({admin});
    }
    catch{
        res.status(500).json({message : error.message});
    }
}

const makeAdmin = async(req,res)=>{
    const userId = req.params.id;
    const {name,email,photoURL,role} = req.body;
    try{
        const updateUser = await User.findByIdAndUpdate(userId,
            {role: "admin"},
            {new : true, runValidators:true}
            );
            if(!updateUser){
                return res.status(404).json({message : "User not found"});
            }
            res.status(200).json(updateUser)
    }catch{
        res.status(500).json({message:error.message});
    }
}
module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getAdmin,
    makeAdmin
}