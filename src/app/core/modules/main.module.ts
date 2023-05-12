import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ImagesService } from 'src/app/core/services/images/images.service';
import { AuthComponent } from 'src/app/front/components/outlet/auth/auth.component';
import { LoginFormComponent } from 'src/app/front/components/outlet/auth/login-form/login-form.component';
import { RegisterFormComponent } from 'src/app/front/components/outlet/auth/register-form/register-form.component';
import { CreateComponent } from 'src/app/front/components/outlet/create/create.component';
import { HomeComponent } from 'src/app/front/components/outlet/home/home.component';
import { LibraryComponent } from 'src/app/front/components/outlet/library/library.component';
import { MessagesComponent } from 'src/app/front/components/outlet/messages/messages.component';
import { EditUserFormComponent } from 'src/app/front/components/outlet/personal/edit-user-form/edit-user-form.component';
import { FreeTextFormComponent } from 'src/app/front/components/outlet/personal/free-text-form/free-text-form.component';
import { PersonalComponent } from 'src/app/front/components/outlet/personal/personal.component';
import { SearchComponent } from 'src/app/front/components/outlet/search/search.component';
import { ArticleItemComponent } from 'src/app/front/components/shared-components/articles-shared-components/article-item/article-item.component';
import { ArticleComponent } from 'src/app/front/components/shared-components/articles-shared-components/article/article.component';
import { ArticlesMovingComponent } from 'src/app/front/components/shared-components/articles-shared-components/articles-moving/articles-moving.component';
import { ArticlesSteadyComponent } from 'src/app/front/components/shared-components/articles-shared-components/articles-steady/articles-steady.component';
import { CategoryHeadlineComponent } from 'src/app/front/components/shared-components/category-headline/category-headline.component';
import { UserDetailsComponent } from 'src/app/front/components/shared-components/edit-details/edit-details.component';
import { ShortenTextPipe } from 'src/app/front/pipes/shoretenText.pipe';
import { StringifyDatePipe } from 'src/app/front/pipes/stringify-date.pipe';
import { UserDetailsService } from 'src/app/core/services/users/user-details.service';
import { BeautifyDatePipe } from 'src/app/front/pipes/beutify-date.pipe';
import { MessageListComponent } from 'src/app/front/components/shared-components/messages-shared-components/message-list/message-list.component';
import { NewMessageComponent } from 'src/app/front/components/outlet/messages/newMessageForm/new-message-form.component';
import { StarsComponent } from 'src/app/front/components/shared-components/stars/stars.component';
import { StarsService } from '../services/articles/stars.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularEditorModule,
  ],
  declarations: [
    HomeComponent,
    LibraryComponent,
    CreateComponent,

    AuthComponent,
    LoginFormComponent,
    RegisterFormComponent,

    SearchComponent,
    CategoryHeadlineComponent,
    UserDetailsComponent,

    ArticleComponent,
    ArticleItemComponent,
    ArticlesMovingComponent,
    ArticlesSteadyComponent,
    StarsComponent,

    PersonalComponent,
    EditUserFormComponent,
    FreeTextFormComponent,

    MessagesComponent,
    MessageListComponent,
    NewMessageComponent,

    ShortenTextPipe,
    StringifyDatePipe,
    BeautifyDatePipe,
  ],
  providers: [ImagesService, UserDetailsService, StarsService],
  exports: [ShortenTextPipe, StringifyDatePipe, BeautifyDatePipe]
})
export class MainModule {}
