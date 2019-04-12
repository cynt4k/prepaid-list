import { ProductExtra } from './ProductExtra';

export interface Product {
    name: string;
    icon: string;
    id: number;
    price: number;
    extras?: ProductExtra[];
}
