import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginDto } from 'src/app/data/DTOs/Users/userLogin.dto';
import { DialogBoxService } from 'src/app/core/services/dialog-box.service';
import { AuthService } from 'src/app/core/services/users/auth.service';
import { localStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../../../../styles/form-styles.css']
})
export class LoginFormComponent implements OnInit {
  constructor(
    private usersService: AuthService, 
    private dialog: DialogBoxService, 
    private localStorageService: localStorageService
    ) 
  { }

  loginForm!: FormGroup;
  passwordRegex!: string;
  user!:UserLoginDto;

  ngOnInit(): void {
    this.passwordRegex = "(?=.*[a-z])(?=.*[A-Z]).{8,20}";
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(
        null,
        [Validators.required, Validators.email]
      ),
      'password': new FormControl(
        null,
        [Validators.required, Validators.pattern(this.passwordRegex)]
      )
    });
  }

  createUser(){
    this.user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
  }

  onSubmit() {
    this.createUser();
    this.usersService.loginUser(this.user).subscribe(res => {
      if (!res) {
        this.dialog.fire('שגיאת התחברות', 'שם משתמש או סיסמא אינם תקינים', 'error');
      } else {
        this.localStorageService.addToken(res.token, res.refreshToken, res.userId);
        this.usersService.getUser().subscribe((res) => {
          if (res) {
            this.usersService.isLoggedIn = true;
            this.usersService.loggedInUser = res;
            this.usersService.loggedInUserChanged.next(res);
            this.dialog.fire('התחברות', 'ההתחברות בוצעה בהצלחה', 'success');
          }
        });
      }
    })
  }

}
