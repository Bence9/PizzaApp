import express from 'express';
import { UserController } from './controller/user.controller';
import { FoodController } from './controller/food.controller';
import { OrderController } from './controller/order.controller';
import { OvenController } from './controller/oven.controller';

export function getRouter(){
    const router = express.Router();

    const userController = new UserController();
    router.get('/user',userController.getAll);
    router.get('/user/:id',userController.getOne);
    router.post('/user',userController.create);
    router.put('/user',userController.update);
    router.delete('/user/:id',userController.delete);

    const foodController = new FoodController();
    router.get('/food',foodController.getAll);
    router.get('/food/:id',foodController.getOne);
    router.post('/food',foodController.create);
    router.put('/food',foodController.update);
    router.delete('/food/:id',foodController.delete);

    const orderController = new OrderController();
    router.get('/order',orderController.getAll);
    router.get('/order/:id',orderController.getOne);
    router.post('/order',orderController.create);
    router.delete('/order/:id',orderController.delete);
    router.put('/order',orderController.update);
    router.get('/order/created-by/:orderId',orderController.OrdersofUser);

    const ovenController = new OvenController();
    router.get('/oven',ovenController.getAll);
    router.get('/oven/:id',ovenController.getOne);
    router.post('/oven',ovenController.create);
    router.delete('/oven/:id',ovenController.delete);
    router.put('/oven',ovenController.update);

    return router;
}