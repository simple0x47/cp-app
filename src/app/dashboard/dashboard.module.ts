import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { OrgSelectorComponent } from './org-selector/org-selector.component';
import { MatMenuModule } from '@angular/material/menu';
import { OrgSelectorDialogComponent } from './org-selector-dialog/org-selector-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ControlModule } from '../control/control.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { OrgSelectorListComponent } from './org-selector-list/org-selector-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    OrgSelectorComponent,
    OrgSelectorDialogComponent,
    OrgSelectorListComponent,
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
  ],
  exports: [HomeComponent],
})
export class DashboardModule {}
