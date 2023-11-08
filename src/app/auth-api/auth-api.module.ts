import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/app/auth-api/auth.state';
import { MembershipApiModule } from '../membership-api/membership-api.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    NgxsModule.forFeature([AuthState]),
    MembershipApiModule,
  ],
})
export class AuthApiModule {}
