import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DialogBoxService } from '../services/dialog-box.service';
import { AuthService } from '../services/users/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private usersService: AuthService,
        private router: Router,
        private dialog: DialogBoxService
    ) { }

    canActivate() {
        if (!this.usersService.loggedInUser) {
            this.router.navigate(['/login'])
                .then(() => {
                    this.dialog.fire(
                        `הגישה נדחתה`,
                        'יש להיות מחובר על מנת לקבל גישה לאזור זה',
                        'warning'
                    );
                });
        }
        return this.usersService.loggedInUser !== null;
    }
}
