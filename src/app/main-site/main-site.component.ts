import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {

  constructor(public authService: AuthService) {}
  ngOnInit(): void {}

}
