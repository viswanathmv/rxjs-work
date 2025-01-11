import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';


import { Product } from '../product';
import { ProductService } from '../product.service';
import { async, catchError, EMPTY, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, CurrencyPipe, AsyncPipe, CommonModule } from '@angular/common';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe,AsyncPipe,FormsModule,CommonModule]
})
export class ProductDetailComponent {
  // Just enough here for the template to compile
  
  errorMessage = '';
  product$ = this.productService.product$.pipe(
    catchError(err => {this.errorMessage = err; return EMPTY})
  );


  constructor(private productService:ProductService) {}
 

  // Set the page title
  //pageTitle = (this.product$ | async as product) ? `Product Detail for: ${this.product$.productName}` : 'Product Detail';
  pageTitle = 'Product Detail';
  

  addToCart(product: Product) {
  }
}
