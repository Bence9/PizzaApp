import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Food } from "../entity/Food"; 

export class FoodController extends Controller {
    repository = AppDataSource.getRepository(Food);
}