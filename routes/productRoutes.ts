import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";

const router = express.Router();

// @desc    Fetch all products
// @route   Get /api/products
// @access  Public
router.get('/', asyncHandler(async (request: express.Request, response: express.Response) => {
    const products = await Product.find({});

    response.json(products);
}));

// @desc    Fetch single product
// @route   Get /api/products/:id
// @access  Public
router.get('/:id', asyncHandler(async (request: express.Request, response: express.Response) => {
    const product = await Product.findById(request.params.id);

    if (product) {
        response.json(product);
    } else {
        response.status(404);
        throw new Error('Product not found');
    }
}));

export default router;
