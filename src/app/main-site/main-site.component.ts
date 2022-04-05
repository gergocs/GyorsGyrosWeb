import {Component, ViewChild} from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Food} from "../shared/services/model/food"
import {ArrayPipe} from "../shared/pipes/array.pipe";
import {FireHandlerService} from "../shared/services/fire-handler.service";

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent {
  showFiller = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public foods: Food[] = [];
  portion = 1;

  constructor(public authService: AuthService, private breakpointObserver: BreakpointObserver, public arrayPipe: ArrayPipe, public reader: FireHandlerService) {
    reader.food$.subscribe(  (res) => {
      // @ts-ignore
      this.foods.push(res);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    });
  }

  addToCart(food: Food){
    this.reader.saveDataToFire("cart", this.authService.userData, food.name);
  }

}
