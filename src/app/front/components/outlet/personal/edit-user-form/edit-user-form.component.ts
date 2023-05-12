import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserUpdateDto } from 'src/app/data/DTOs/Users/userUpdate.dto';
import { DialogBoxService } from 'src/app/core/services/dialog-box.service';
import { AuthService } from 'src/app/core/services/users/auth.service';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.css', '../../../../styles/form-styles.css']
})
export class EditUserFormComponent implements OnInit {

  constructor(
    private usersService: AuthService, 
    private dialog: DialogBoxService
  ) { }

  editDetailsForm!: FormGroup;
  user!: UserUpdateDto;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.editDetailsForm = new FormGroup({
      'email': new FormControl(
        this.usersService.loggedInUser!.email,
        [Validators.required, Validators.email]
      ),
      'userName': new FormControl(
        this.usersService.loggedInUser!.userName,
        [Validators.required]
      ),
      'dob': new FormControl(
        new Date(this.usersService.loggedInUser!.dob).toISOString().split("T")[0],
        [Validators.required]
      ),
      'categories': new FormControl(this.usersService.loggedInUser!.favCategoriesList),
      'hobbies': new FormControl(this.usersService.loggedInUser!.hobbiesList),
      'aboutMe': new FormControl(this.usersService.loggedInUser!.aboutMe)
    });
  }

  createUser() {
    this.user = {
      email: this.usersService.loggedInUser!.email,
      newEmail: this.editDetailsForm.value.email,
      userName: this.editDetailsForm.value.userName,
      dob: this.editDetailsForm.value.dob,
      favCategoriesList: this.editDetailsForm.value.categories,
      hobbiesList: this.editDetailsForm.value.hobbies,
      aboutMe: this.editDetailsForm.value.aboutMe
    }
  }

  onSubmit() {
    this.createUser();
    this.usersService.updateUser(this.user).subscribe(res => {
      if (!res){
        this.usersService.loggedInUser!.email = this.editDetailsForm.value.email;
        this.usersService.loggedInUserChanged.next(this.usersService.loggedInUser);
        this.dialog.fire('עדכון', 'העדכון בוצע בהצלחה', 'success');
      }
      else {
        this.dialog.fire('שגיאה', 'העדכון נכשל', 'error');
      }
    });
  }

}
