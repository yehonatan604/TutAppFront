import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessageStatusTypes } from 'src/app/data/enums/enums';
import { Message } from 'src/app/data/models/message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css', '../../../../styles/table-styles.css']
})
export class MessageListComponent {
  constructor(private router: Router) {}

  @Input() messages!: Message[];
  statusTypes = MessageStatusTypes;

  goToMessage(id: number) {
    this.router.navigate(['/message/', id])
  }
}
