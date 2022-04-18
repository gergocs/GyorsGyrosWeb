export class Order {
  uid: string;
  address: string;
  phone: string;
  items: string;
  price: number;
  date: number;
  payment: string;


  constructor(uid: string, address: string, phone: string, items: string, price: number, date: number , payment: string) {
    this.uid = uid;
    this.address = address;
    this.phone = phone;
    this.items = items;
    this.price = price;
    this.date = date;
    this.payment = payment;
  }
}
