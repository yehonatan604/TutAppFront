import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { AuthService } from 'src/app/core/services/users/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageGuard implements CanActivate {
  constructor(
    private messagesService: MessagesService,
    private usersService: AuthService
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = route.params['id'];
    let result!: boolean;

    this.messagesService.getMessageById(id).subscribe((data) => {
      result = (data.reciverEmail || data.senderEmail) == this.usersService.loggedInUser!.email;
    });

    return result;
  }
}
