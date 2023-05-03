import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { Message } from 'src/app/data/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message!: Message;
  constructor(
    private activatedRoute: ActivatedRoute,
    private messagesService: MessagesService,
  ) { }

  ngOnInit(): void {
    this.subscribeRouteParams();
  }

  subscribeRouteParams() {
    return this.activatedRoute.params.subscribe(params => {
      return this.messagesService.getMessageById(params['id']).subscribe(msg => {
        this.message = msg;
      });
    });
  }
}
