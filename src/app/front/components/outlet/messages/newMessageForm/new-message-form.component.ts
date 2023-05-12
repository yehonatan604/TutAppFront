import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageSendDto } from 'src/app/data/DTOs/Messages/message.dto';
import { UserRegisterDto } from 'src/app/data/DTOs/Users/userRegister.dto';
import { DialogBoxService } from 'src/app/core/services/dialog-box.service';
import { MessagesService } from 'src/app/core/services/messages/messages.service';
import { AuthService } from 'src/app/core/services/users/auth.service';
import { MessageStatusTypes } from 'src/app/data/enums/enums';

@Component({
  selector: 'app-messages',
  templateUrl: './new-message-form.component.html',
  styleUrls: ['../../../../styles/form-styles.css']
})
export class NewMessageComponent implements OnInit {
  constructor(
    private usersService: AuthService,
    private messagesService: MessagesService,
    private dialog: DialogBoxService
  ) {}

  newMessageForm!: FormGroup;
  user!: UserRegisterDto;
  msg!: MessageSendDto;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newMessageForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });
  }

  fillMsg() {
    this.msg = {
      SenderEmail: this.usersService.loggedInUser!.email,
      ReciverEmail: 'admin@email.com',
      title: this.newMessageForm.value.title,
      content: this.newMessageForm.value.content,
      created: new Date(),
      status: MessageStatusTypes.Pending,
    }
  }

  onSubmit() {
    this.dialog.show('שליחת הודעה', 'האם אתה בטוח?').then((result) => {
      if (result.isConfirmed) {
        this.fillMsg();
        this.messagesService.sendMessage(this.msg).subscribe((res) => {
          res ? this.dialog.fire('שליחת הודעה', 'השליחה בוצעה בהצלחה.', 'success')
            : this.dialog.fire('שליחת הודעה', 'השליחה נכשלה, אנא נסה שנית.', 'warning');
        });
      } else {
        this.dialog.fire('שליחת הודעה', 'השליחה בוטלה.', 'warning');
      }
    });
  }
}
