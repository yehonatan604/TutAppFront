import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogBoxService } from 'src/app/core/services/dialog-box.service';
import { localStorageService } from 'src/app/core/services/local-storage.service';
import { AuthService } from 'src/app/core/services/users/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../header/header.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private usersService: AuthService,
    private router: Router,
    private localStorageService: localStorageService,
    private dialog: DialogBoxService
  ) {}

  collapsed: boolean = true;
  logMode: string = 'התחבר';
  userName: string = 'אזור אישי';

  ngOnInit(): void {
    this.usersService.loggedInUserChanged.subscribe((_) => {
      this.logMode = !this.usersService.loggedInUser ? 'התחבר' : 'התנתק';
    });
  }

  onDisconnect() {
    if (this.usersService.loggedInUser) {
      this.dialog
        .show('התנתקות', 'האם אתה בטוח שברצונך להתנתק?')
        .then((result) => {
          if (result.isConfirmed) {
            this.localStorageService.removeToken();
            this.usersService.loggedInUser = undefined;
            this.usersService.loggedInUserChanged.next(null);
            this.router.navigate(['/']);
          }
        });
    }
  }
}
