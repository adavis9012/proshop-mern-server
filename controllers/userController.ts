import asyncHandler from "express-async-handler";
import express from "express";
import User from "../models/userModel";

// @desc    Auth user & get token
// @route   Get /api/users/login
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
            token: null,
        });
    }

    response.status(401);
    throw new Error('Invalid email or password');
});

export {
    authUser,
}