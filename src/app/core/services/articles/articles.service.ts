import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from "../../../data/models/article.model";
import { ArticlePostDto } from "../../../data/DTOs/article.dtos";

@Injectable({ providedIn: 'root' })
export class ArticlesService {
    constructor(
        private http: HttpClient
    ) { }
    
    articlesUrl: string = 'https://localhost:7012/api/Articles';
    
    fetchArticles() {
        return this.http.get<Article[]>(this.articlesUrl);
    }
    
    fetchArticleById(id: number) {
        return this.http.get<Article>(`${this.articlesUrl}/${id}`);
    }

    addStarsToArticle(id: number, stars: number) {
        return this.http.get<boolean>(`${this.articlesUrl}/addStarsToArticle/${id}/${stars}`).subscribe();
    }

    searchArticles(word: string) {
        return this.http.get<Article[]>(`${this.articlesUrl}/?$filter=contains(title, '${word}')`);
    }

    fetchUserArticles(userName: string) {
        return this.http.get<Article[]>(`${this.articlesUrl}/?$filter=contains(userEmail, '${userName}')`); 
    }

    fetchArticlesBy(term: string) {
        return this.http.get<Article[]>(`${this.articlesUrl}/?$orderby=${term}`); 
    }

    postArticle(article: ArticlePostDto) {
        return this.http.post<ArticlePostDto>(`${this.articlesUrl}/addNewArticle`, article);
    }

    deleteArticle(id: number) {
        return this.http.delete(`${this.articlesUrl}/${id}`);
    }
}