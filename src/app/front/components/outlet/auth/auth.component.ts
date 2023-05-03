import { Component } from '@angular/core';
import { FormTypes } from 'src/app/data/enums/enums';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['../../../styles/form-styles.css']
})
export class AuthComponent{
  constructor() { }

  formType!: FormTypes;

  onLoginClick() {
    this.formType = FormTypes.Login;
  }

  onRegisterClick() {
    this.formType = FormTypes.Register;
  }
}
