import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dessert } from '../../shared/interfaces';

export interface CartItem {
  product: Dessert;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private removedItem = new BehaviorSubject<string>('');
  cartItems$ = this.cartItems.asObservable();
  removedItem$ = this.removedItem.asObservable();

  updateCart(product: Dessert, quantity: number) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.name === product.name);

    if (quantity === 0) {
      // Remove item if quantity is 0
      if (existingItemIndex !== -1) {
        currentItems.splice(existingItemIndex, 1);
        this.removedItem.next(product.name);
      }
    } else {
      if (existingItemIndex !== -1) {
        // Update existing item
        currentItems[existingItemIndex].quantity = quantity;
      } else {
        // Add new item
        currentItems.push({ product, quantity });
      }
    }

    this.cartItems.next([...currentItems]);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  getCartTotal(): Observable<number> {
    return new Observable<number>(observer => {
      this.cartItems$.subscribe(items => {
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        observer.next(total);
      });
    });
  }
} 