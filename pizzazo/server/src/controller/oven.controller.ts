import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Oven } from "../entity/Oven"

export class OvenController extends Controller {
    repository = AppDataSource.getRepository(Oven);
}