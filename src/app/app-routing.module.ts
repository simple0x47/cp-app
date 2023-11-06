import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/auth/forgot-password/forgot-password.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignUpComponent } from 'src/app/auth/sign-up/sign-up.component';
import { HomeComponent } from 'src/app/dashboard/home/home.component';
import {
  canActivateIsLoggedIn,
  canActivateIsNotLoggedIn,
} from './auth-api/auth.router-guards';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [canActivateIsNotLoggedIn],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [canActivateIsNotLoggedIn],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [canActivateIsNotLoggedIn],
  },
  { path: '', component: HomeComponent, canActivate: [canActivateIsLoggedIn] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
