import { Component, OnInit } from '@angular/core';

import { NgIf, NgFor, NgClass ,AsyncPipe} from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { catchError, map, Observable, shareReplay, tap, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent,HttpClientModule,AsyncPipe]
})
export class ProductListComponent implements OnInit{
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';

  // Products
  products!: Product[];

  // Selected product id to highlight the entry
  
  readonly selectedProductId$ = this.productService.productSelected$;

  constructor(private productService: ProductService) {
    
   }

   ngOnInit(): void {
    shareReplay(1);
    this.productService.products$.pipe().subscribe({ 
      next: (products:Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });
  }

 

  onSelected(productId: number): void {
   this.productService.productSelected(productId);
  }
}
