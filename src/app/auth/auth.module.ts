import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from 'src/app/control/control.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthApiModule } from 'src/app/auth-api/auth-api.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RoutingModule } from '../routing/routing.module';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatExpansionModule,
    ControlModule,
    ReactiveFormsModule,
    AuthApiModule,
    MatProgressBarModule,
    RoutingModule,
  ],
  exports: [LoginComponent, SignUpComponent, ForgotPasswordComponent],
})
export class AuthModule {}
