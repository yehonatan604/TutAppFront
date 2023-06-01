import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArticlePostDto } from 'src/app/data/DTOs/Articles/articlePost.dto';
import { ArticlePutDTO } from 'src/app/data/DTOs/Articles/articlePut.dto';
import { Image } from 'src/app/data/models/image.model';
import { ArticlesService } from 'src/app/core/services/articles/articles.service';
import { DialogBoxService } from 'src/app/core/services/dialog-box.service';
import { EditorService } from 'src/app/core/services/editor.service'; 
import { ImagesService } from 'src/app/core/services/images/images.service';
import { AuthService } from 'src/app/core/services/users/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../../../styles/form-styles.css'],
  providers: [EditorService]
})
export class CreateComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: AuthService,
    private articlesService: ArticlesService,
    private imagesService: ImagesService,
    private dialog: DialogBoxService,
    private editorService: EditorService) {
  }

  createArticleForm!: FormGroup;

  editorConfig!: AngularEditorConfig;

  articlePost!: ArticlePostDto;
  articleId!: number;
  imageId!: number;
  image!: Image;
  categoryImageList!: Image[];
  categoriesList!: string[];
  mode!: string;

  titleRegex!: string;
  contentRegex!: string;

  ngOnInit(): void {
    this.titleRegex = "(?=.*[a-z]).{8,20}|(?=.*[A-Z]).{8,20}|(?=.*[א-ת]).{8,20}";
    this.contentRegex = "(?=.*[a-z]).{100,1000}|(?=.*[A-Z]).{100,1000}|(?=.*[א-ת]).{100,1000}";
    this.categoriesList = ['Programming', 'Internet', 'IOT', 'Design'];

    this.editorConfig = this.editorService.editorConfig;
    this.imagesService.fetchImages().subscribe(images => {
      this.categoryImageList = images;
    });
    this.subscribeRouteParams();
    this.createForm();
  }

  subscribeRouteParams() {
    this.activatedRoute.params.subscribe(params => {
      if (params['mode'] == 'edit') {
        this.mode = params['mode'];
        this.articleId = params['id'];
        } else { 
          this.mode = 'create';
        };
      });
  }

  createForm() {
    this.createArticleForm = new FormGroup({
      'content': new FormControl(
        this.mode == 'edit' ? this.articlesService.article.content : null,
        [Validators.required, Validators.pattern(this.contentRegex)]
      ),
      'title': new FormControl(
        this.mode == 'edit' ? this.articlesService.article.title : null,
        [Validators.required, Validators.pattern(this.titleRegex)]
      ),
      'category': new FormControl(
        this.mode == 'edit' ? this.articlesService.article.category : null,
        [Validators.required]
      ),
      'image': new FormControl(
        this.mode == 'edit' ? this.articlesService.article.imageId : null,
        [Validators.required]
      ),
    });
  }

  createArticle() {
    this.imageId = this.categoryImageList.filter( image => { 
      return image.title == this.createArticleForm.value.image
    })[0].id;
    this.articlePost = {
      title: this.createArticleForm.value.title,
      imageId: this.imageId,
      content: this.createArticleForm.value.content,
      category: this.categoriesList.indexOf(this.createArticleForm.value.category),
      userName: this.usersService.loggedInUser!.userName,
      userEmail: this.usersService.loggedInUser!.email,
      created: new Date()
    }
  }

  putArticle() : ArticlePutDTO {
    return {
      id: this.articleId,
      content: this.createArticleForm.value.content,
      imageId: this.articlesService.article.imageId,
      category: this.categoriesList.indexOf(this.createArticleForm.value.category)
    }
  }
  
  showImage() {
    this.categoryImageList.forEach(e => {
      if (e.title === this.createArticleForm.value.image) {
        this.image = e;
      }
    })
  }

  onSubmit() {
    this.imagesService.fetchImageByTitle(this.createArticleForm.value.image)
    .subscribe(images => {
      this.createArticle();
      if (this.mode == 'create') {
        this.articlePost.imageId = this.imageId;
      }
      else {
      this.articlePost.imageId = this.articlesService.article.imageId;
      }
      this.mode == 'create' ?
        this.articlesService.postArticle(this.articlePost).subscribe(res => {
          res ? 
            this.dialog.fire('הוספת מאמר', 'המאמר נוסף בהצלחה', 'success') : 
          this.dialog.fire('הוספת המאמר', 'הוספת המאמר נכשלה!', 'warning');
        }) :
        console.log(this.putArticle());
          this.articlesService.putArticle(this.putArticle()).subscribe(res => {
            res ? 
              this.dialog.fire('הוספת מאמר', 'המאמר נוסף בהצלחה', 'success') : 
            this.dialog.fire('הוספת המאמר', 'הוספת המאמר נכשלה!', 'warning');
        });
    });
  }
}
