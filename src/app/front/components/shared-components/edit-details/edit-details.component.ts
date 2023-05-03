import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css', ]
})
export class UserDetailsComponent {
  @Input() propList!: {};
}
