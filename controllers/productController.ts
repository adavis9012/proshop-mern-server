import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
import express from "express";

// @desc    Fetch all products
// @route   Get /api/products
// @access  Public
const getProducts = asyncHandler(async (request: express.Request, response: express.Response) => {
    const products = await Product.find({});

    response.json(products);
});

// @desc    Fetch single product
// @route   Get /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (request: express.Request, response: express.Response) => {
    const product = await Product.findById(request.params.id);

    if (product) {
        response.json(product);
    } else {
        response.status(404);
        throw new Error('Product not found');
    }
});

export {
    getProducts,
    getProductById,
}