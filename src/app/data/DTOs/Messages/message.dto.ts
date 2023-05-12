import { MessageStatusTypes } from "src/app/data/enums/enums";

export interface MessageSendDto {
    SenderEmail: string;
    ReciverEmail: string;
    title: string;
    content: string;
    created: Date;
    status: MessageStatusTypes;
  }