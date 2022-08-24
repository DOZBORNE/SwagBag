import { Product } from '../../models/product';

export interface ICartItem {
  quantity: number;
  item: Product;
}
