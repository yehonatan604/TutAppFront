import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/models/article.model';
import { ArticlesService } from 'src/app/core/services/articles/articles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search!: string;
  articles!: Article[];
  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.articleService.searchArticles(this.search).subscribe(items => {
      this.articles = items;
    })
  }

}
