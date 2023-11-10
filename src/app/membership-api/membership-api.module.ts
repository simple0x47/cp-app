import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { MembershipState } from './membership.state';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxsModule.forFeature([MembershipState])],
})
export class MembershipApiModule {}
