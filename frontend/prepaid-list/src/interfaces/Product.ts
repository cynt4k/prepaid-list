import { ProductExtra } from './ProductExtra';

export interface Product {
    name: string;
    icon: string;
    id: string;
    price: number;
    extras?: ProductExtra[];
}
