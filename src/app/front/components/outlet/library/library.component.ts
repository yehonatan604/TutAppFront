import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/models/article.model';
import { CategoryTypes } from 'src/app/data/enums/enums';
import { ArticlesService } from 'src/app/core/services/articles/articles.service';
import { MovingArticlesService } from 'src/app/core/services/articles/moving-articles.service'; 
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  articlesList!: Article[];
  articlesByProgramming!: Article[];
  articlesByInternet!: Article[];
  articlesByDesign!: Article[];
  articlesByIOT!: Article[];
  categoryTypes = CategoryTypes;

  constructor(
    private articlesService: ArticlesService,
    private movingArticlesService: MovingArticlesService
  ) { }

  ngOnInit(): void {
    this.articlesService.fetchArticles().subscribe(items => {
      this.articlesList = items;
      this.articlesByProgramming = this.articlesList.filter(x => x.category == CategoryTypes.Programming);
      this.articlesByInternet = this.articlesList.filter(x => x.category == CategoryTypes.Internet);
      this.articlesByDesign = this.articlesList.filter(x => x.category == CategoryTypes.Design);
      this.articlesByIOT = this.articlesList.filter(x => x.category == CategoryTypes.IOT);
    });
  }

  moveLeft(sender: CategoryTypes) {
    this.move(sender, "left")
  }

  moveRight(sender: CategoryTypes) {
    this.move(sender, "right")
  }

  move(sender: CategoryTypes, direction: string) {
    sender == CategoryTypes.Programming ?
      this.articlesByProgramming = this.movingArticlesService.move(this.articlesByProgramming, direction) :
      sender == CategoryTypes.Internet ?
        this.articlesByInternet = this.movingArticlesService.move(this.articlesByInternet, direction) :
        sender == CategoryTypes.Design ?
          this.articlesByDesign = this.movingArticlesService.move(this.articlesByDesign, direction) :
          this.articlesByIOT = this.movingArticlesService.move(this.articlesByIOT, direction);
  }
}
