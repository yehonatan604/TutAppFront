import { Component } from '@angular/core';
import { AuthService } from './core/services/users/auth.service';
import { localStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Tut';

  constructor(
    private usersService: AuthService,
    private localStorageService: localStorageService
  ) {
    if (localStorageService.checkToken()) {
      this.usersService.refreshToken().subscribe((res) => {
        if (res) {
          this.localStorageService.addToken(res.token, res.refreshToken, res.userId);
        }
      });
      this.usersService.getUser().subscribe((res) => {
        if (res) {
          this.usersService.loggedInUser = res;
          this.usersService.loggedInUserChanged.next(res);
        }
      });
    }
  }
}
