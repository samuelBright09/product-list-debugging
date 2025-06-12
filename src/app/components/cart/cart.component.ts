import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { OrderConfirmedModalComponent } from '../order-confirmed-modal/order-confirmed-modal.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderConfirmedModalComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  totalCartItems: number = 0;
  showOrderConfirmedModal: boolean = false;

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.updateCartSummary();
    });
  }

  updateCartSummary(): void {
    this.totalCartItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartTotal = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  removeItem(productName: string): void {
    this.cartService.removeItem(productName);
  }

  openOrderConfirmedModal(): void {
    this.showOrderConfirmedModal = true;
  }

  startNewOrder(): void {
    this.cartService.clearCart();
    this.showOrderConfirmedModal = false;
  }
}
