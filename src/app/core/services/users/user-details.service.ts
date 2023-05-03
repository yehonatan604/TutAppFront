import { Injectable } from "@angular/core";
import { Article } from "../../../data/models/article.model";
import { User } from "../../../data/models/user.model";

@Injectable()
export class UserDetailsService {
    userDetails = {};
    userStats = {};

    fillLists(user: User, articles: Article[]) {
        this.userDetails = {
            'שם משתמש': user.userName,
            'אימייל': user.email,
            'תאריך לידה': new Date(user.dob).toLocaleDateString(),
            'קצת על עצמי': user.aboutMe,
            'תחביבים': user.hobbiesList,
            'קטגוריות מועדפות': user.favCategoriesList
        }

        let views: number = 0;
        let stars: number = 0;
        
        articles.reduce((acc, obj)=> {
            stars += obj.stars;
            views += obj.views;
            return acc;
        }, 0 );

        views = Math.round(views / (articles.length))/100;
        (stars /= articles.length).toFixed(1);

        this.userStats = {
            'מאמרים שכתבתי': articles.length,
            'ממוצע צפיות למאמר': views,
            'ממוצע כוכבים למאמר': stars
        }
    }
}