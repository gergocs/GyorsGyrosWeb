import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {FireHandlerService} from "../shared/services/fire-handler.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {Food} from "../shared/services/model/food";
import {Order} from "../shared/services/model/order";
import {ArrayPipe} from "../shared/pipes/array.pipe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  showFiller = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  cart: Food[] = [];
  price = 0;

  stepperOrientation: Observable<StepperOrientation>;
  cityOptions: any;
  streetOptions: any;
  numberOptions: any;

  phoneController: any;
  numberController: any;
  streetController: any;
  cityController: any;
  payment: string = "card";

  constructor(public authService: AuthService, private breakpointObserver: BreakpointObserver, public reader: FireHandlerService, private _formBuilder: FormBuilder, public arrayPipe: ArrayPipe, public router: Router) {
    if (authService.userData === undefined){
      this.router.navigate(['sign-in']);
    }
    this.reader.cart$.subscribe((res) => {
      let cart = res.cart.split(",");
      this.reader.food$.subscribe((res) => {
        // @ts-ignore
        if (cart.includes(res.name)) {
          for (let i = 0; i < cart.length; i++) {
            // @ts-ignore
            if (cart[i] === res.name) {
              // @ts-ignore
              this.cart.push(res);
              // @ts-ignore
              this.price += res.price;
            }
          }
        }
      });
    });

    this.delay(1000).then(() => {
      if (this.cart.length == 0) {
        this.router.navigate(['main-site']).then(() => {});
      }
    });

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

  }

  ngOnInit(): void {
    this.cityOptions = [this.authService.userData.address.split(", ")[0]];
    this.streetOptions = [this.authService.userData.address.split(", ")[1]];
    this.numberOptions = [this.authService.userData.address.split(", ")[2]];

    this.cityController = new FormControl('', [Validators.required, Validators.maxLength(30)]);
    this.streetController = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.numberController = new FormControl('', [Validators.required, Validators.maxLength(10)]);
    this.phoneController = new FormControl('', [Validators.required, Validators.maxLength(13)]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close().then(() => {});
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open().then(() => {});
        }
      });
    });
  }

  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  placeOrder(address: string, phone: string) {
    const currentDate = new Date();

    let items = "";
    for (let i = 0; i < this.cart.length; i++) {
      items += this.cart[i].name + ", ";
    }

    items = items.slice(0, -2);

    this.reader.createNewOrder(new Order(this.authService.userData.uid.toString(), address, phone, items, this.price, currentDate.getTime(), this.payment));
    this.reader.deleteCart();
    this.router.navigate(['main-site']).then(() => {});
  }

  removeFromCart(food: Food) {
    this.cart.splice(this.cart.indexOf(food), 1);
    let value = "";
    for (let i = 0; i < this.cart.length; i++) {
      value += this.cart[i].name + ",";
    }
    if (value.endsWith(",")) {
      value = value.slice(0, -1)
    }
    this.reader.updateCart(value);
    this.router.navigate(['main-site']).then(() => {});
  }

}
