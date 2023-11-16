import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMembershipComponent } from './new-membership/new-membership.component';
import { ControlModule } from '../control/control.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from '../routing/routing.module';
import { MembershipApiModule } from '../membership-api/membership-api.module';
import { OrgApiModule } from '../org-api/org-api.module';
import {MembershipSelectorComponent} from "./membership-selector/membership-selector.component";
import {
  MembershipSelectorDialogComponent
} from "./membership-selector/membership-selector-dialog/membership-selector-dialog.component";
import {
  MembershipSelectorListComponent
} from "./membership-selector/membership-selector-list/membership-selector-list.component";

@NgModule({
  declarations: [NewMembershipComponent, MembershipSelectorComponent,
    MembershipSelectorDialogComponent,
    MembershipSelectorListComponent,],
  imports: [
    CommonModule,
    ControlModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatRadioModule,
    ReactiveFormsModule,
    RoutingModule,
    MembershipApiModule,
    OrgApiModule,
  ],
  exports: [
    MembershipSelectorComponent
  ]
})
export class MembershipModule {}
