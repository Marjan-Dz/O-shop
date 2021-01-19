import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { pipe } from 'rxjs';
import { iterator } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private db : AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products' , ref => ref.orderByChild('name')).snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
          const data = a.payload.val() as any ;
          const id = a.payload.key;
          return { id, ...data } as Product;
      })));
    
    
  }

  get(productId){
    return this.db.object('/products/' + productId).valueChanges().pipe(map(item => item as Product));
  }

  update(productId,product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
