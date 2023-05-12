import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Article } from "../../../data/models/article.model";
import { ArticlePostDto } from "src/app/data/DTOs/Articles/articlePost.dto";
import { ArticlePutDTO } from "src/app/data/DTOs/Articles/articlePut.dto";

@Injectable({ providedIn: 'root' })
export class ArticlesService {
    constructor(private http: HttpClient) { }
    
    article!: Article;

    url: string = 'https://tutappapi-yehonatan.azurewebsites.net/v1/api/Articles';
    
    fetchArticles() {
        return this.http.get<Article[]>(this.url);
    }
    
    fetchArticleById(id: number) {
        return this.http.get<Article>(`${this.url}/${id}`);
    }

    searchArticles(word: string) {
        return this.http.get<Article[]>(`${this.url}/?$filter=contains(title, '${word}')`);
    }

    fetchUserArticles(userName: string) {
        return this.http.get<Article[]>(`${this.url}/?$filter=contains(userEmail, '${userName}')`); 
    }

    fetchArticlesBy(term: string) {
        return this.http.get<Article[]>(`${this.url}/?$orderby=${term}`); 
    }

    postArticle(article: ArticlePostDto) {
        return this.http.post<ArticlePostDto>(`${this.url}/addNewArticle`, article);
    }

    putArticle(article: ArticlePutDTO) {
        return this.http.put(`${this.url}`, article);
    }

    deleteArticle(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }
}