import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainSiteComponent } from './main-site/main-site.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthGuard } from './shared/guard/auth.guard';
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'main-site', component: MainSiteComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
