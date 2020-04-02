import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {DonationComponent} from "./forms/donation/donation.component";


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'donation', component: DonationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
