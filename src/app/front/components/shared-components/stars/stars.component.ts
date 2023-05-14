import { Component, Input } from '@angular/core';
import { DialogBoxService } from 'src/app/core/services/dialog-box.service';
import { StarsService } from 'src/app/core/services/articles/stars.service';
import { AuthService } from 'src/app/core/services/users/auth.service';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css'],
})
export class StarsComponent {
  @Input() id!: number;
  constructor(
    private dialog: DialogBoxService,
    private starsService: StarsService,
    private authService: AuthService
  ) { }
  

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
    if (!this.authService.loggedInUser!) {
      this.dialog.fire('דירוג', 'עליך להיות מחובר על מנת לדרג מאמר','warning');
      return;
    }
    this.clicked = true;
    elements.forEach((element) => {
      element.className = 'fa fa-star';
      element.style.color = 'red';
    });

    unusedElements.forEach((element) => {
      element.className = 'fa fa-star-o';
      element.style.color = 'black';
    });

    this.starsService.addStarsToArticle(this.id, elements.length).subscribe(res =>
      res ?
        this.dialog.fire('דירוג', 'הדירוג עודכן בהצלחה', 'success') :
        this.dialog.fire('דירוג', 'אופס!\n משהו השתבש בדירוג\n אנא נסה שוב מאוחר יותר','error')
    );
  }
}
