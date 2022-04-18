import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {FireHandlerService} from "../shared/services/fire-handler.service";
import {Order} from "../shared/services/model/order";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  showFiller = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  orders: Order[] = [];

  constructor(public authService: AuthService, private breakpointObserver: BreakpointObserver, private reader: FireHandlerService, public datePipe: DatePipe) {
    setTimeout(() => {
      reader.order$.subscribe(results => {
        results.forEach(res => {
          this.orders.push(res);
        });
      });
    });
  }
  ngOnInit(): void {}

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
}
