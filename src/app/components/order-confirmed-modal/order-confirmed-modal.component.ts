import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-order-confirmed-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmed-modal.component.html',
  styleUrl: './order-confirmed-modal.component.scss'
})
export class OrderConfirmedModalComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() orderTotal: number = 0;
  @Output() startNewOrderEvent = new EventEmitter<void>();

  startNewOrder() {
    this.startNewOrderEvent.emit();
  }
} 