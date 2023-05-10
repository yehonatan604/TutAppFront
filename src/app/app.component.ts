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
    private authService: AuthService,
    private localStorageService: localStorageService
  ) {
    if (localStorageService.checkToken()) {
      this.authService.refreshToken().subscribe((res) => {
        if (res) {
          this.localStorageService.addToken(res.token, res.refreshToken, res.userId);
        }
      });
      this.authService.getUser().subscribe((res) => {
        if (res) {
          this.authService.loggedInUser = res;
          this.authService.loggedInUserChanged.next(res);
        }
      });
    }
  }
}
