import { Product } from './Product';
import { ProductExtra } from './ProductExtra';

export interface ShoppingCartItem {
    product: Product;
    productExtra?: ProductExtra;
    amount: number;
}
