import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { Product } from './models/product';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  
  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId);
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
   
  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(){
      let cartId = localStorage.getItem('cartId');
      if (cartId) return cartId;
      
      let result = await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;
  }

   addToCart(product: Product){
    //let cartId = await this.getOrCreateCartId();
    //let item$ = this.getItem(cartId,product.id);
    //item$.snapshotChanges().take(1).subscribe(item => {
      //refactoring
      //item$.update({ product: product, quantity: (item.payload.exportVal()?.quantity || 0) + 1});
      // if (item.payload.exists()) item$.update({ quantity: item.payload.exportVal().quantity + 1});
      // else item$.set({product: product, quantity:1});
      this.updateItemQuantity(product,-1);
    }

   removeFromCart(product: Product){
    this.updateItemQuantity(product,1);
  }

  private async updateItemQuantity(product: Product,change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId,product.id);
    item$.snapshotChanges().take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.payload.exportVal()?.quantity || 0) + change});
  });
}
}
