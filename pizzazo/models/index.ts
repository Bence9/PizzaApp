export interface UserDTO{
    id: number;
    name: string;
    address: string;
    phone: string;
}

export interface FoodDTO{
    id: number;
    name: string;
    price: number;
    size: string;
    description: string;
    making_time: number;
}

export interface OrderDTO{
    id: number;
    timestamp: string;
    price: number;
    source: UserDTO | null ;
    orderedfood: FoodDTO | null;
    deliveryTime: number;
    status: string;
}

export interface OvenDTO{
    id: number;
    time: number;
    status: string;
}