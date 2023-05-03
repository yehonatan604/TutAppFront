import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/data/models/article.model';
import { ArticlesListTypes } from 'src/app/data/enums/enums';

@Component({
  selector: 'app-category-headline',
  templateUrl: './category-headline.component.html',
  styleUrls: ['./category-headline.component.css']
})
export class CategoryHeadlineComponent {
  constructor(
    private router: Router,
  ) { }

  @Output() moveWasClicked = new EventEmitter<string>();
  @Input() title!: string;
  @Input() articlesList!: Article[];

  articleListType = ArticlesListTypes;

  onClickCategory() {
    this.router.navigate(['/category', this.title])
  }

  onClickRight() {
    this.moveWasClicked.emit("right");
  }

  onClickLeft() {
    this.moveWasClicked.emit("left");
  }
}
