import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Food } from "./entity/Food"
import { Order } from "./entity/Order"
import { Oven } from "./entity/Oven"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "pizza",
    synchronize: true,
    logging: true,
    entities: [User, Food, Order, Oven],
    migrations: [],
    subscribers: [],
})
