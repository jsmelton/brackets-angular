import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { StateService } from '../../../services/state.service';
import { User } from '../../../models/responses/user';
import { State } from '../../../models/state';
import { UserRequest } from '../../../models/requests/userRequest';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private formBuilder = inject (FormBuilder)
  userService = inject(UserService);
  stateService = inject(StateService)
  editUserForm = this.formBuilder.group({
    id: [0],
    userId:["", Validators.required],
    firstName:["", Validators.required],
    lastName:["", Validators.required],
    userRole:["", Validators.required]
  })
  user: User = {
    id: 0,
    userId: '',
    firstName: '',
    lastName: '',
    role: '',
    createdDate: '',
    updatedDate: ''
  }
  stateList: State[] = [];
  
  constructor(
    private router: Router
  ) {
    const userId = parseInt(this.route.snapshot.params['id'], 10);
    this.userService.getUserById(userId).then((user: User) => {
      this.user = user;
      this.displayUser(user);
    });
    this.stateList = this.stateService.getStateList();
  }
  
  /*addPlayer() {
    console.log("In add method")
    this.players.push(this.createPlayer());
  }*/
  
  cancel() {
    this.router.navigateByUrl("/user");
  }
  
  displayUser(user: User) {
    this.editUserForm.patchValue({
      id: user.id,
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userRole: user.role,
    });
  }

  saveModifications() {
    console.log("In submit method");
      
    let newUser: UserRequest = {
      id: this.editUserForm.value.id ?? 0,
      userId: this.editUserForm.value.userId ?? "",
      firstName: this.editUserForm.value.firstName ?? "",
      lastName: this.editUserForm.value.lastName ?? "",
      role: this.editUserForm.value.userRole ?? "",
      createdDate:  "",
      updatedDate:  ""
    }
    this.userService.updateUser(newUser).subscribe(
      data => {
        this.router.navigateByUrl("/user")
      })
  }
}
