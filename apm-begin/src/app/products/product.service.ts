import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, filter, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Review } from '../reviews/review';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'http://localhost:4201/products';

  private constructor(private http:HttpClient) { }

  private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  productSelected(selectedProductId: number): void {
    this.productSelectedSubject.next(selectedProductId);
  }

  readonly product1$ = this.productSelected$.pipe(
    filter(Boolean),
    switchMap( id =>{
      return this.http.get<Product>(`${this.productsUrl}/${id}`).pipe(
        tap((data:Product)=>console.log('getProduct API /products/id: ', JSON.stringify(data))),
        switchMap((product:Product)=>this.getReviewsForTheProduct(product))
      );
    } ),
    shareReplay(1),
    
  );

  // fetches all products
  readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    tap((data:Product[]) => console.log('fetch all Product API /products: ', JSON.stringify(data))),
    shareReplay(1),
  );

  // fetches selected product
  product$ = combineLatest([this.products$, this.productSelected$]).pipe(
    map(([products, selectedProductId]) => products.find(product => product.id === selectedProductId)),
    filter(Boolean),
    tap((data:Product)=>console.log('fetch product Details + Reviews product$ API /products/id: ', JSON.stringify(data))),
    switchMap((product:Product)=>this.getReviewsForTheProduct(product))
  );

 
  // fetches reviews for the product
  getReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.productsUrl}/${productId}/reviews`).pipe(
      tap((data:Review[])=>console.log('fetch all the reviews for a given product API /products/id/reviews: ', JSON.stringify(data)))
    );
  }

  // fetches reviews for the product if present
  getReviewsForTheProduct(product:Product): Observable<Product> {
    const isReviewPresent:boolean = product.hasReviews ? true : false;
    if(isReviewPresent){
      return  this.getReviews(product.id).pipe(  
        map((reviews:Review[])=>({...product, reviews} as Product)),
       
      );
    }else{
     return of(product);
    }

  }

 
   

}
