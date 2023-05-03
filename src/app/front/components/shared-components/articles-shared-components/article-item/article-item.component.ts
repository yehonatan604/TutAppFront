import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/data/models/article.model';
import { LoremIpsumService } from 'src/app/core/services/articles/lorem-ipsum.service';
import { ImagesService } from 'src/app/core/services/images/images.service';
import { AuthService } from 'src/app/core/services/users/auth.service';
import {ArticlesService} from 'src/app/core/services/articles/articles.service';
import { DialogBoxService } from 'src/app/core/services/dialog-box.service';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css'],
})
export class ArticleItemComponent implements OnInit {
  @Input() article!: Article;
  author!: string;
  authorEmail!: string;
  imagePath!: string;
  isCreator: boolean = false;

  constructor(
    private router: Router,
    private articlesService: ArticlesService,
    private loremService: LoremIpsumService,
    private imagesService: ImagesService,
    private usersService: AuthService,
    private dialogBox: DialogBoxService
  ) {}

  ngOnInit(): void {
    this.article.content =
      this.article.content == '*'
        ? this.loremService.lorem
        : this.article.content;
    this.author = this.article.userName;
    if (this.usersService.loggedInUser != null) {
      this.isCreator = this.article.userEmail == this.usersService.loggedInUser.email;
    }
    this.imagesService
      .fetchImageById(this.article.imageId)
      .subscribe((images) => {
        this.imagePath = images[0].location;
      });
  }

  onClick() {
    this.router.navigate(['/articles', this.article.id]);
  }

  deleteArticle() {
   this.dialogBox.show('מחיקת מאמר', 'פעולה זו תמחק את המאמר לצמיתות, האם להמשיך בפעולה?')
   .then(result => {
      if (result.isConfirmed) {
        this.articlesService.deleteArticle(this.article.id).subscribe( res => {
          res? 
          this.dialogBox.fire('מחיקת מאמר', 'המחיקה בוצעה בהצלחה', 'success') :
          this.dialogBox.fire('מחיקת מאמר', 'המחיקה נכשלה', 'success');
        })
      }
    });
  }

  editArticle() {
    
  }
}
