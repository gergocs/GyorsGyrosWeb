import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class ReadFromFireService {

  data: any = [];

  constructor(private db: AngularFireDatabase) { }

  ngOnInit(): void {
    const ref = this.db.list("cart");
    ref.valueChanges().subscribe((data) => {
      this.data = data;
    })
  }
}
