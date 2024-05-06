import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {OrderDTO} from '../../../models';
import { User } from './User';
import { Food } from './Food';

@Entity()
export class Order implements OrderDTO {
    deliveyTime: number;

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    timestamp: string;

    @ManyToOne(() => User, user => user.transactions, { eager: true})
    source: User;

    @ManyToOne(() => Food, food => food.ordering, { eager: true})
    orderedfood: Food;

    @Column()
    price: number;

    @Column()
    deliveryTime: number;

    @Column()
    status: string;
}