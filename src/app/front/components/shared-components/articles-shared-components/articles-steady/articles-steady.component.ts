import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/data/models/article.model';
import { CategoryTypes } from 'src/app/data/enums/enums';
import { ArticlesService } from 'src/app/core/services/articles/articles.service';

@Component({
  selector: 'app-articles-steady',
  templateUrl: './articles-steady.component.html',
  styleUrls: ['./articles-steady.component.css']
})
export class ArticlesSteadyComponent implements OnInit {
  @Input() articles!: Article[];
  title!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.subscribeRouteParams();
  }

  subscribeRouteParams() {
    this.activatedRoute.params.subscribe(params => {
      this.title = params['title'];
      this.title === 'החדשים ביותר' ?
        this.articlesService.fetchArticlesBy('created').subscribe(items => this.articles = items.reverse()) :
        this.title === 'המדורגים ביותר' ?
          this.articlesService.fetchArticlesBy('stars').subscribe(items => this.articles = items.reverse()) :
          this.title === 'הנצפים ביותר' ?
            this.articlesService.fetchArticlesBy('views').subscribe(items => this.articles = items.reverse()) :
            this.title === 'שפות תכנות' ?
              this.articlesService.fetchArticles().subscribe(items => this.articles = items.filter(x => x.category == CategoryTypes.Programming)) :
              this.title === 'אינטרנט ורשתות' ?
                this.articlesService.fetchArticles().subscribe(items => this.articles = items.filter(x => x.category == CategoryTypes.Programming)) :
                this.title === 'עיצוב גרפי' ?
                  this.articlesService.fetchArticles().subscribe(items => this.articles = items.filter(x => x.category == CategoryTypes.Programming)) :
                  this.title === 'בית חכם' ?
                    this.articlesService.fetchArticles().subscribe(items => this.articles = items.filter(x => x.category == CategoryTypes.Programming)) :
      ''
    })
  }
}
