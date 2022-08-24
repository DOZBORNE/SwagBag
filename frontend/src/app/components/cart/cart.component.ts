import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from './cart.service';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  plusIcon = faPlusCircle;
  minusIcon = faMinusCircle;

  cartItems$ = this.cartService.cartItems$;
  cartTotal$ = this.cartService.cartTotal$;

  constructor(private productService: ProductService, private cartService: CartService, private router: Router) { }

  decrementItemInCart(itemId: number): void {
    this.cartService.removeCartItem(itemId);
  }

  incrementItemInCart(itemId: number, item: Product): void {
    this.cartService.addCartItem(itemId, item);
  }

  emptyCart(): void {
    this.cartService.removeAllCartItems();
    this.router.navigate(['/home']);
  }

}
