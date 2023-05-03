import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/data/models/article.model';
import { ArticlesService } from 'src/app/core/services/articles/articles.service';
import { LoremIpsumService } from 'src/app/core/services/articles/lorem-ipsum.service'; 
import { ImagesService } from 'src/app/core/services/images/images.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article!: Article;
  imagePath!: string;
  title = "";
  content = "";
  id = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesService: ArticlesService,
    private loremService: LoremIpsumService,
    private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.subscribeRouteParams();
  }

  subscribeRouteParams() {
    this.activatedRoute.params.subscribe(params => {
      this.articlesService.fetchArticleById(params[`id`]).subscribe((items:Article) => {
        this.article = items;
        this.title = this.article.title;
        this.content = this.article.content == '*' ? this.loremService.lorem : this.article.content;
        this.id = params['id'];

        this.imagesService.fetchImages().subscribe(images => {
          this.imagePath = images[images.findIndex(e => e.id == this.article.imageId)].location;
        });
      });
    });
  }
}
