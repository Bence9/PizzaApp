import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./Order";

@Entity()
export class Food {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    size: string;

    @Column()
    description: string;

    @Column()
    making_time: number;

    @OneToMany(() => Order, order => order.orderedfood)
    ordering: Order[];

}