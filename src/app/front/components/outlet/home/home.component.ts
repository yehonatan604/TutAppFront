import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/models/article.model';
import { ArticlesListTypes } from 'src/app/data/enums/enums';
import { ArticlesService } from 'src/app/core/services/articles/articles.service';
import { MovingArticlesService } from 'src/app/core/services/articles/moving-articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  articlesByNew!: Article[];
  articlesByStarred!: Article[];
  articlesByVisited!: Article[];
  articleListType = ArticlesListTypes;

  constructor(
    private articlesService: ArticlesService,
    private movingArticlesService: MovingArticlesService
  ) { }

  ngOnInit(): void {
    this.articlesService.fetchArticlesBy("created").subscribe(articles => {
      this.articlesByNew = articles.reverse();
    })
    this.articlesService.fetchArticlesBy("stars").subscribe(articles => {
      this.articlesByStarred = articles.reverse();
    })
    this.articlesService.fetchArticlesBy("views").subscribe(articles => {
      this.articlesByVisited = articles.reverse();
    })
  }

  moveLeft(sender: ArticlesListTypes) {
    this.move(sender, "left")
  }

  moveRight(sender: ArticlesListTypes) {
    this.move(sender, "right")
  }

  move(sender: ArticlesListTypes, direction: string) {
    sender == ArticlesListTypes.New ?
      this.articlesByNew = this.movingArticlesService.move(this.articlesByNew, direction) :
      sender == ArticlesListTypes.Starred ?
        this.articlesByStarred = this.movingArticlesService.move(this.articlesByStarred, direction) :
        this.articlesByVisited = this.movingArticlesService.move(this.articlesByVisited, direction);
  }
}