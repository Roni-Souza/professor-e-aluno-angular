import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = "http://localhost:3000/products";
  
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl);
  }
  
  save(product: Product): Observable<Product>{
    return this.http.post<Product>(this.apiUrl, product);
  }

  // HTTP DELETE: http://localhost:3000/products/6
  delete(product: Product): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${product.id}`);
  }

  update(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

}
