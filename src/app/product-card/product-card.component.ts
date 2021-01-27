import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product : Product){
    let cardId = localStorage.getItem('cardId');
    if (!cardId){
      this.cartService.create().then(result => {
        localStorage.setItem('cartId',result.key);

        //Add products to shopping-cart
      });
    }
    else{
      //Add products to shopping-cart
    }
  }

}
