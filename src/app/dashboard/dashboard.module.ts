import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuthModule } from 'src/app/auth/auth.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AuthModule
  ],
  exports: [
    HomeComponent
  ]
})
export class DashboardModule { }
