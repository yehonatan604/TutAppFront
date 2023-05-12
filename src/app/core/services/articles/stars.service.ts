import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../users/auth.service";
import { Stars } from "src/app/data/models/stars.model";

@Injectable()
export class StarsService {
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    url: string = 'https://tutappapi-yehonatan.azurewebsites.net/v1/api/Stars';

    addStarsToArticle(articleId: number, stars: number) {
        let starsObj: Stars = {
            articleId: articleId,
            userId: this.authService.loggedInUser?.id!,
            starsGiven: stars
        }
        
        return this.http.post(`${this.url}`, starsObj);
    } 
}