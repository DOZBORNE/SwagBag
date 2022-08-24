import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {

  allProducts: Observable<Product[]> = this.productService.getProducts();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // unnecessary to subscribe here.

    // this.productService.getProducts().subscribe(
    //   (resp) => this.allProducts = resp,
    //   (err) => console.log(err),
    //   () => console.log("Products Retrieved")
    // );
  }

}
