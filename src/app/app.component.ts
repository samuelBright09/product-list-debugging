import { Component, inject, OnInit } from '@angular/core';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { Dessert } from '../shared/interfaces';
import { ProductsServiceService } from './services/products.service';

@Component({
  selector: 'app-root',
  imports: [AddToCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

// Bug found:The problem is that the Angular component decorator property should be named styleUrls (plural) instead of styleUrl (singular), and the decorator should not end with a semicolon.
export class AppComponent implements OnInit {
  title = 'Product list';
  desserts: Dessert[] | null = null;
  private dessertsData = inject(ProductsServiceService);

  ngOnInit(): void {
   this.dessertsData.getProducts().subscribe(data => this.desserts = data);

}



}
