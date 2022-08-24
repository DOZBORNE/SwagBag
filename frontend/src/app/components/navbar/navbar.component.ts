import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartCount$: Observable<number> = this.cartService.cartCount$;
  subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    // this.subscription = this.productService.getCart().subscribe(
    //   (cart) => this.cartCount = cart.cartCount
    // );
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
