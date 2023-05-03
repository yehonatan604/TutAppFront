import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/users/auth.service';
import { UserDetailsService } from 'src/app/core/services/users/user-details.service';
import { ArticlesService } from 'src/app/core/services/articles/articles.service';
import { Article } from 'src/app/data/models/article.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  constructor(
    private usersService: AuthService, 
    private articlesService: ArticlesService, 
    private userDetailsService: UserDetailsService
  ) { }

  articles!: Article[];
  userDetails = {};
  userStats = {};
  
  showForm: boolean = false;

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.articlesService.fetchUserArticles(this.usersService.loggedInUser!.email).subscribe(articles => {
      this.articles = articles;
      this.userDetailsService.fillLists(this.usersService.loggedInUser!, articles);
      this.userDetails = this.userDetailsService.userDetails;
      this.userStats = this.userDetailsService.userStats;
    });
  }

  onClickToggleShowEditForm() {
    this.showForm = !this.showForm;
  }
}
