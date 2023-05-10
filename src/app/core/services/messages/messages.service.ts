import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageSendDto } from 'src/app/data/DTOs/message.dtos';
import { Message } from '../../../data/models/message.model';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    constructor(
        private httpClient: HttpClient
    ) {}

    url: string = 'https://tutappapi-yehonatan.azurewebsites.net/api/v1/messages';

    getUserMessagesIn(email: string) {
        return this.httpClient.get<Message[]>(`${this.url}/?$filter=contains(ReciverEmail, '${email}')`);
    }

    getUserMessagesOut(email: string) {
        return this.httpClient.get<Message[]>(`${this.url}/?$filter=contains(SenderEmail, '${email}')`);
    }

    getMessageById(id:number) {
        return this.httpClient.get<Message>(`${this.url}/${id}`);
    }

    sendMessage(msg: MessageSendDto) {
        return this.httpClient.post<Message>(this.url, msg);
    }
}