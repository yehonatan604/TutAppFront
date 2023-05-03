import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DialogBoxService } from '../services/dialog-box.service';
import { AuthService } from '../services/users/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private usersService: AuthService,
        private router: Router,
        private dialog: DialogBoxService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.usersService.loggedInUser) {
            this.router.navigate(['/'])
                .then(() => {
                    this.dialog.fire(
                        `הגישה נדחתה`,
                        'יש להיות מחובר על מנת לקבל גישה לאזור זה',
                        'error'
                    );
                });
        }
        return this.usersService.loggedInUser !== null;
    }
}
