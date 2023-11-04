import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/app/auth-api/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, CommonModule, NgxsModule.forFeature([AuthState])],
})
export class AuthApiModule {}
