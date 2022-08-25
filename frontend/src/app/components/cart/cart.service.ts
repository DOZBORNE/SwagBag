import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartItem } from './cart.constants';
import { Product } from '../../models/product';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartItems: BehaviorSubject<Map<number, ICartItem>> = new BehaviorSubject<Map<number, ICartItem>>(new Map());

  cartItems$: Observable<Map<number, ICartItem>> = this._cartItems.asObservable();
  cartTotal$: Observable<number> = this.cartItems$.pipe(map(items => this.calculateCartTotal(items)));
  // you can also write the map function like this below, instead of using arrow function syntax like above.
  cartCount$: Observable<number> = this.cartItems$.pipe(map(this.countCartItems));

  constructor() { }

  set cartItems(items: Map<number, ICartItem>) {
    this._cartItems.next(items);
  }

  get cartItems(): Map<number, ICartItem> {
    return this._cartItems.getValue();
  }

  addCartItem(itemId: number, item: Product): void {
    this.cartItems = this.cartItems.set(itemId, {
      quantity: (this.cartItems.get(itemId)?.quantity ?? 0) + 1,
      item
    });
  }

  removeCartItem(itemId: number): void {
    const foundItemCount = this.cartItems.get(itemId);

    if (foundItemCount && foundItemCount.quantity > 1) this.cartItems.set(itemId, {
      quantity: foundItemCount.quantity - 1,
      item: foundItemCount.item
    });
    else this.cartItems.delete(itemId);

    this.cartItems = this.cartItems;
  }

  removeAllCartItems(): void {
    this.cartItems.clear();
  }

  private calculateCartTotal(items: Map<number, ICartItem>): number {
    let sumTotal = 0;
    items.forEach((value, key) => {
      sumTotal += value.quantity * value.item.price;
    });

    return sumTotal;
  }

  private countCartItems(items: Map<number, ICartItem>): number {
    let cartTotal = 0;
    items.forEach((value, key) => {
      cartTotal += value.quantity;
    });
    return cartTotal;
  }

  /**
   * Can be used to grab a snapshot of the current cart total.
   * SHOULD NOT be used but for single instances that aren't going to need re-rendered.
   * This will NOT update. It's static. If you need it to update. Subscribe to the cartTotal$ observable
   */
  retrieveCartTotal(): number {
    let total: number = 0;
    this.cartTotal$.pipe(first()).subscribe(price => {
      total = price;
    });

    return total;
  }
}
