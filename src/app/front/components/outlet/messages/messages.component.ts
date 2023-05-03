import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { AuthService } from 'src/app/core/services/users/auth.service';
import { Message } from 'src/app/data/models/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    private messagesService: MessagesService, 
    private usersService: AuthService,
    private router: Router
  ) { }

  messagesIn!: Message[];
  messagesOut!: Message[];

  ngOnInit(): void {
    this.messagesService.getUserMessagesIn(this.usersService.loggedInUser!.email).subscribe(messages => {
      this.messagesIn = messages;
    });
    
    this.messagesService.getUserMessagesOut(this.usersService.loggedInUser!.email).subscribe(messages => {
      this.messagesOut = messages;
    });
  }

  onNewMessage(){
    this.router.navigate(['newMessage']);
  }

}
