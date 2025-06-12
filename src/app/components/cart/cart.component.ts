import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  totalCartItems: number = 0;

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);
    });
    this.cartService.getCartTotal().subscribe(total => this.cartTotal = total);
  }

  removeItem(productName: string): void {
    const itemToRemove = this.cartItems.find(item => item.product.name === productName);
    if (itemToRemove) {
      this.cartService.updateCart(itemToRemove.product, 0);
    }
  }
}
