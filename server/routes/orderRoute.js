
import express from 'express';
import authuser from '../middleware/authUser.js';
import { getAllOrders,  getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js';

const orderRouter=express.Router();
orderRouter.post('/cod',authuser,placeOrderCOD)
orderRouter.get('/user',authuser,getUserOrders)
orderRouter.get('/seller',authSeller,getAllOrders)
orderRouter.post('/stripe',authuser,placeOrderStripe)

export default orderRouter;