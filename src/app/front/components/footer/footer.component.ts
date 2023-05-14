import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router) { }

  navigateToAboutPage() {
    this.router.navigate(["/about"]);
  }

  makeContact() {
    window.location.href = 'mailto:yehonatan604@gmail.com';
  }

  navigateToGithub() {
    window.open('https://github.com/yehonatan604/TutAppFront', "_blank");
  }
}
