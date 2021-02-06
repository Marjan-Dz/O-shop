import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { promise } from 'protractor';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  
  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId)
      .valueChanges().map( x =>{ 
        const s = <ShoppingCart> x;  
        return new ShoppingCart(s.itemsMap) 
      
      });
      
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
   
  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/itemsMap/' + productId);
  }

  private async getOrCreateCartId(){
      let cartId = localStorage.getItem('cartId');
      if (cartId) return cartId;
      
      let result = await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;
  }

   addToCart(product: Product){
      this.updateItemQuantity(product,1);
    }

   removeFromCart(product: Product){
    this.updateItemQuantity(product,-1);
  }

  private async updateItemQuantity(product: Product,change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.id);
    item$.snapshotChanges().take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.payload.exportVal()?.quantity || 0) + change});
  });
}
}
