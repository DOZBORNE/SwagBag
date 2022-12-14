import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() productInfo!: Product;

  // cartCount!: number;
  // products: {
  //   product: Product,
  //   quantity: number
  // }[] = [];
  // subscription!: Subscription;
  // totalPrice: number = 0;


  constructor(private productService: ProductService, private readonly cartService: CartService) { }

  ngOnInit(): void {
    // this.subscription = this.productService.getCart().subscribe(
    //   (cart) => {
    //     this.cartCount = cart.cartCount;
    //     this.products = cart.products;
    //     this.totalPrice = cart.totalPrice;
    //   }
    // );
  }

  addToCart(product: Product): void {
    this.cartService.addCartItem(product.id, product);
    const items = this.cartService.cartItems;
    console.log(items, 'itmes');
    console.log(product, 'product');
    // let inCart = false;

    // this.products.forEach(
    //   (element) => {
    //     if (element.product == product) {
    //       ++element.quantity;
    //       let cart = {
    //         cartCount: this.cartCount + 1,
    //         products: this.products,
    //         totalPrice: this.totalPrice + product.price
    //       };
    //       this.productService.setCart(cart);
    //       inCart = true;
    //       return;
    //     }
    //     ;
    //   }
    // );
    //
    // if (inCart == false) {
    //   let newProduct = {
    //     product: product,
    //     quantity: 1
    //   };
    //   this.products.push(newProduct);
    //   let cart = {
    //     cartCount: this.cartCount + 1,
    //     products: this.products,
    //     totalPrice: this.totalPrice + product.price
    //   };
    //   this.productService.setCart(cart);
    // }

  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
