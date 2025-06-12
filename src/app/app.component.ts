import { Component, inject, OnInit } from '@angular/core';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { CartComponent } from './components/cart/cart.component';
import { Dessert } from '../shared/interfaces';
import { ProductsServiceService } from './services/products.service';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddToCartComponent, CartComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'Product list';
  desserts: Dessert[] | null = null;
  
  private dessertsData = inject(ProductsServiceService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.dessertsData.getProducts().subscribe(data => this.desserts = data);
  }

  onQuantityChange(event: {product: Dessert, quantity: number}) {
    this.cartService.updateCart(event.product, event.quantity);
  }
}
