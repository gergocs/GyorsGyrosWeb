import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  showFiller = false;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(public authService: AuthService, private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {}

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
