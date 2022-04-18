import {Injectable, NgZone} from '@angular/core';
import {User} from './model/user';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import firebase from "firebase/compat";
import {FireHandlerService} from "./fire-handler.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any;
  public wait: boolean;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) {
    this.wait = false;
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.afs.collection("users").doc(this.userData.uid).get().subscribe((snapshot) => {
          const address = snapshot.data();
          if (!address) {
            this.userData.address = "unspecified";
          } else {
            // @ts-ignore
            this.userData.address = address.address;
          }
        });
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }


  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        this.wait = true;
        await this.delay(1000);
        this.wait = false;
        this.ngZone.run(() => {
          this.router.navigate(['main-site']);
        });
      })
      .catch(e =>{
        console.log(e)
      })
  }

  private async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  SignUp(email: string, password: string, city: string, street: string, address: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail().then(() => {});
        this.SaveAddress(result.user, city, street, address, false);
        this.SetUserData(result.user).then(() => {});
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']).then(() => {});
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['main-site']).then(() => {});
      }
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['main-site']).then(() => {});
        });
        this.SetUserData(result.user).then(() => {});
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      address: user.address,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']).then(() => {});
    });
  }

  SaveAddress(user: firebase.User | null, city: string, street: string, address: string, redirect: boolean) {
    let reader = new FireHandlerService(this.afs, this);
    reader.saveDataToFire("users", user, city + ", " + street + ", " + address).then(() => {});
    if(redirect){
      this.router.navigate(['main-site']).then(() => {});
    }
  }
}
