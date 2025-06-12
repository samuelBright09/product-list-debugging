import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Dessert } from '../../../shared/interfaces';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.scss'
})
export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() product!: Dessert;
  @Output() quantityChange = new EventEmitter<{product: Dessert, quantity: number}>();
  
  isAddedToCart = false;
  quantity = 1;
  private removedItemSubscription: Subscription;

  constructor(private cartService: CartService) {
    this.removedItemSubscription = this.cartService.removedItem$.subscribe(removedItemName => {
      if (removedItemName === this.product.name) {
        this.isAddedToCart = false;
        this.quantity = 1;
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to cart items to initialize isAddedToCart state
    this.cartService.getCartItems().subscribe(items => {
      const item = items.find(item => item.product.name === this.product.name);
      this.isAddedToCart = !!item;
      if (item) {
        this.quantity = item.quantity;
      }
    });
  }

  ngOnDestroy(): void {
    this.removedItemSubscription.unsubscribe();
  }

  addToCart() {
    this.isAddedToCart = true;
    this.quantityChange.emit({product: this.product, quantity: this.quantity});
  }

  decreaseProductItem() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit({product: this.product, quantity: this.quantity});
    } else {
      this.isAddedToCart = false;
      this.quantity = 1;
      this.quantityChange.emit({product: this.product, quantity: 0});
    }
  }

  increaseProductItem() {
    this.quantity++;
    this.quantityChange.emit({product: this.product, quantity: this.quantity});
  }
}
