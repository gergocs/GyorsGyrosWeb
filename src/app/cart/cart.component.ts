import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {FireHandlerService} from "../shared/services/fire-handler.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  showFiller = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(public authService: AuthService, private breakpointObserver: BreakpointObserver, public reader: FireHandlerService) { }

  ngOnInit(): void {
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
}
