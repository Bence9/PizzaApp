import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Order } from "../entity/Order";

export class OrderController extends Controller {
    
    repository = AppDataSource.getRepository(Order);

    create = async (req, res) => {
        try{
            const entity = this.repository.create(req.body as object);
            delete entity.id;
            delete entity.timestamp;

            const saveEntity = await this.repository.save(entity);
            res.json(saveEntity);
        } catch(err){
            this.handleError(res, err);
        }
    };

    OrdersofUser = async (req, res) => {
        try{
            const userId = req.params.orderId;

            const orders = await this.repository.find({
                where: {
                    source: { id: userId }
                }
            });

            res.json(orders);
        } catch(err){
            this.handleError(res, err);
        }
    };


}