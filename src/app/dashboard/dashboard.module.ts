import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ControlModule } from '../control/control.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { RoutingModule } from '../routing/routing.module';
import { MembershipApiModule } from '../membership-api/membership-api.module';
import {MembershipModule} from "../membership/membership.module";

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    ControlModule,
    MatExpansionModule,
    RoutingModule,
    MembershipApiModule,
    MembershipModule
  ],
  exports: [HomeComponent],
})
export class DashboardModule {}
