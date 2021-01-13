import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories',ref => ref.orderByChild('name'))
       .snapshotChanges();
       //.subscribe(res => {
      //   res.forEach(e =>{
      //     console.log(e.key)
      //     console.log(e.payload.val())
      //   })
      //  })
  }
}
