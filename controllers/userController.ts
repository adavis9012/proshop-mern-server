import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import express from "express";
import generateToken from "../utils/generateToken";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (request: express.Request, response: express.Response) => {
    const {name, email, password} = request.body;
    const userExist = await User.findOne({email});

    if (userExist) {
        response.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if(user) {
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        response.status(400);
        throw new Error('Invalid user data');
    }
});


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (request: express.Request, response: express.Response) => {
    const {email, password} = request.body;
    const user = await User.findOne({email});

    if (user && await user.matchPassword(password)) {
        return response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }

    response.status(401);
    throw new Error('Invalid email or password');
});

// @desc    Get User Profile
// @route   Get /api/users/profile
// @access  Public
const getUserProfile = asyncHandler(async (request: express.Request, response: express.Response) => {
    const user = await User.findById(request.user?._id);

    if(user) {
        return response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }

    response.status(404);
    throw new Error('User not found');
});

export {
    authUser,
    registerUser,
    getUserProfile,
}