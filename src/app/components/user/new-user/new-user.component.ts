import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { StateService } from '../../../services/state.service';
import { State } from '../../../models/state';
import { Router } from '@angular/router';
import { UserRequest } from '../../../models/requests/userRequest';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatButtonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
    private formBuilder = inject(FormBuilder)
    userService = inject(UserService);
    stateService = inject(StateService);
    newUserForm = this.formBuilder.group({
      userId:["", Validators.required],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      userRole:["", Validators.required],
    })
    stateList: State[] = [];
  
    constructor(
      private router: Router
    ) {
      this.stateList = this.stateService.getStateList();
    }
  
    cancel() {
      this.router.navigateByUrl("user");
    }
  
    createUser() {
      console.log("In submit method");
    
      let newUser: UserRequest = {
        id: 0,
        userId: this.newUserForm.value.userId ?? "",
        firstName: this.newUserForm.value.firstName ?? "",
        lastName: this.newUserForm.value.lastName ?? "",
        role: this.newUserForm.value.userRole ?? "",
        createdDate: "",
        updatedDate: "",
      }
      this.userService.createUser(newUser).subscribe(
        data => {
          this.router.navigateByUrl("/user")
        }
      );
    }

}
