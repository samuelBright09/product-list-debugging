import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dessert } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsServiceService {
  private readonly productsUrl = 'data.json';
  private productsSubject = new BehaviorSubject<Dessert[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getProducts();
  }

  getProducts() : Observable<Dessert[]> {
   return this.http.get<Dessert[]>(this.productsUrl)
  }
}
