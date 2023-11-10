import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MembershipSelectorComponent } from './membership-selector/membership-selector.component';
import { MatMenuModule } from '@angular/material/menu';
import { MembershipSelectorDialogComponent } from './membership-selector/membership-selector-dialog/membership-selector-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ControlModule } from '../control/control.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MembershipSelectorListComponent } from './membership-selector/membership-selector-list/membership-selector-list.component';
import { RoutingModule } from '../routing/routing.module';
import { MembershipApiModule } from '../membership-api/membership-api.module';

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    MembershipSelectorComponent,
    MembershipSelectorDialogComponent,
    MembershipSelectorListComponent,
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
  ],
  exports: [HomeComponent],
})
export class DashboardModule {}
