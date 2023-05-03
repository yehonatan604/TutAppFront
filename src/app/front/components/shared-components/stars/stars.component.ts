import { Component, Input } from '@angular/core';
import { DialogBoxService } from 'src/app/core/services/dialog-box.service';
import { ArticlesService } from 'src/app/core/services/articles/articles.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent {
  @Input() id!: number;
  constructor(
    private articlesService: ArticlesService,
    private dialog: DialogBoxService
  ) {}

  clicked: boolean = false;

  onMouseOver(...elements: HTMLElement[]) {
    elements.forEach((element) => {
      element.style.color = 'red';
    });
  }

  onMouseLeave(...elements: HTMLElement[]) {
    elements.forEach((element) => {
      element.style.color = 'black';
    });
  }

  onClick(unusedElements: HTMLElement[], ...elements: HTMLElement[]) {
    this.clicked = true;
    elements.forEach((element) => {
      element.className = 'fa fa-star';
      element.style.color = 'red';
    });

    unusedElements.forEach((element) => {
      element.className = 'fa fa-star-o';
      element.style.color = 'black';
    });

    this.articlesService.addStarsToArticle(this.id, elements.length);
    this.dialog.fire('דירוג', 'הדירוג עודכן בהצלחה', 'success');
  }
}
