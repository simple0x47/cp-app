import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: FormControl<string> = new FormControl();
  public password: FormControl<string> = new FormControl();

  public constructor(

  ) {

  }

  public onClickLogin() {

  }
}
