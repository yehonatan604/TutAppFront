import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ArticlePostDto } from 'src/app/data/DTOs/article.dtos';
import { Image } from 'src/app/data/models/image.model';
import { ArticlesService } from 'src/app/core/services/articles/articles.service';
import { DialogBoxService } from 'src/app/core/services/dialog-box.service';
import { EditorService } from 'src/app/core/services/editor.service'; 
import { ImagesService } from 'src/app/core/services/images/images.service';
import { AuthService } from 'src/app/core/services/users/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../../../styles/form-styles.css'],
  providers: [EditorService]
})
export class CreateComponent implements OnInit {
  constructor(
    private usersService: AuthService,
    private articlesService: ArticlesService,
    private imagesService: ImagesService,
    private dialog: DialogBoxService,
    private editorService: EditorService) {
  }

  createArticleForm!: FormGroup;

  editorConfig!: AngularEditorConfig;

  article!: ArticlePostDto;
  image!: Image;
  categoryImageList!: Image[];
  categoriesList!: string[];

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

    this.createForm();
  }

  createForm() {
    this.createArticleForm = new FormGroup({
      'content': new FormControl(
        null,
        [Validators.required, Validators.pattern(this.contentRegex)]
      ),
      'title': new FormControl(
        null,
        [Validators.required, Validators.pattern(this.titleRegex)]
      ),
      'category': new FormControl(
        null,
        [Validators.required]
      ),
      'image': new FormControl(
        null,
        [Validators.required]
      ),
    });
  }

  createArticle() {
    this.article = {
      title: this.createArticleForm.value.title,
      imageId: 0,
      content: this.createArticleForm.value.content,
      category: this.categoriesList.indexOf(this.createArticleForm.value.category),
      userName: this.usersService.loggedInUser!.userName,
      userEmail: this.usersService.loggedInUser!.email,
      created: new Date()
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
      this.article.imageId = images[0].id;
      this.articlesService.postArticle(this.article).subscribe();
    });
  }
}
