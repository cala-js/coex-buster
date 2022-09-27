import { Router } from "express";
import shoppingController from "../controllers/shopping.controller";
const router :Router = Router();


router
    .route('/add')
    .post(shoppingController.create);


router
    .route('/getshop')
    .get(shoppingController.getAll);


export default router;