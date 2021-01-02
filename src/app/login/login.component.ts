import { AngularFireAuthModule } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private afAuth: AngularFireAuthModule) {}
/*
  login(){
    this.afAuth.auth.singInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }
*/
}
