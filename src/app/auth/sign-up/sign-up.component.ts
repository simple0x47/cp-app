import { Component, ViewChild } from '@angular/core';
import { MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  @ViewChild(MatRadioGroup)
  public createOrJoinOrganization: MatRadioGroup | null = null;
}
