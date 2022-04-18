import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Food} from "./model/food";
import {AuthService} from "./auth.service";
import {Cart} from "./model/cart";
import {flatMap, Observable} from "rxjs";
import {Ingredient} from "./model/ingredient";
import {User} from "./model/user";
import {Order} from "./model/order";


@Injectable({
  providedIn: 'root'
})
export class FireHandlerService {

  cartCollectionRef: AngularFirestoreCollection<Cart>;
  foodCollectionRef: AngularFirestoreCollection<Food>;
  ingredientCollectionRef: AngularFirestoreCollection<Ingredient>;
  userCollectionRef: AngularFirestoreCollection<User>;
  orderCollectionRef: AngularFirestoreCollection<Order>;
  cart$: Observable<Cart>;
  food$: Observable<Food[]>;
  order$: Observable<Order[]>;

  constructor(private db: AngularFirestore, public authService: AuthService) {

    this.cartCollectionRef = this.db.collection("cart");
    this.foodCollectionRef = this.db.collection("food");
    this.ingredientCollectionRef = this.db.collection("ingredient");
    this.userCollectionRef = this.db.collection("users");
    this.orderCollectionRef = this.db.collection<Order>("order");

    this.cart$ = this.db.collection<Cart>('cart', ref => ref.where("uid", "==", authService.userData.uid).limit(1))
      .valueChanges()
      .pipe(
        flatMap(cart => cart)
      );

    this.order$ = this.db.collection<Order>('order', ref => ref.where("uid", "==", authService.userData.uid)).valueChanges();

    this.food$ = this.db.collection<Food[]>('food').valueChanges().pipe(flatMap(food => {
      for (let i = 0; i < food.length; i++) {
        // @ts-ignore
        let ingredients = food[i].ingredients;
        // @ts-ignore
        food[i].ingredients = [];
        // @ts-ignore
        ingredients.forEach((ingredient) => {
          this.ingredientCollectionRef.doc<Ingredient>(ingredient.toString()).ref.get().then(function (doc) {
            // @ts-ignore
            food[i].ingredients.push(doc.data());
          })
        });
      }
      return food;
    }));
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async saveDataToFire(type: string, ...data: any[]) {
    if (type === "users") {
      this.userCollectionRef.doc(data[0]?.uid).update({
        address: data[1]
      })
        .then(() => {
        })
        .catch((e: any) => {
          console.log(e);
        })
    } else if (type === "cart") {
      let tmp = "";
      this.cart$.subscribe((res) => {
        tmp += res.cart + (res.cart == "" ? "" : ",") + data[1];
      });
      await this.delay(1000);
      this.db.collection(type).doc(data[0]?.uid).update({
        cart: tmp
      })
        .then(() => {
        })
        .catch((e: any) => {
          console.log(e);
        })
    }
  }

  updateCart(cart: string) {
    this.cartCollectionRef.doc(this.authService.userData.uid).update({cart: cart}).then(r => r);
  }

  deleteCart(){
    this.cartCollectionRef.doc(this.authService.userData.uid).delete().then(r => r);
  }

  createNewOrder(order: Order) {
    this.orderCollectionRef.add({
      uid: order.uid,
      address: order.address,
      phone: order.phone,
      items: order.items,
      price: order.price,
      date: order.date,
      payment: order.payment
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    })
  }

}
