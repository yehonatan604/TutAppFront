import { MessageStatusTypes } from '../enums/enums';

export interface Message {
  id: number,
  senderEmail: string;
  senderName: string;
  reciverEmail: string;
  reciverName: string;
  title: string;
  content: string;
  created: Date;
  status: MessageStatusTypes;
}
