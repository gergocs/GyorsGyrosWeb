import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class WriteToFireService { //Don't ask me how to write to a fire, but it's working, so I don't care

  constructor(private db: AngularFirestore) {}

  saveDataToFire(type: string, ...data : any[]){
    if (type === "users"){
      this.db.collection(type).doc(data[0]?.uid).set({
        uid: data[0]?.uid,
        address: data[1]
      })
        .then((res: any) => {
          console.log(res);
        })
        .catch((e: any) => {
          console.log(e);
        })
    }
  }
}
