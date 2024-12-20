import { Component } from '@angular/core';

import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalSignedUpInfoComponent } from '../modal-signed-up-info/modal-signed-up-info.component';
import { SignUpForm } from '../models/sign-up-form.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-modal-sign-up',
  standalone: false,
  templateUrl: './modal-sign-up.component.html',
  styleUrl: './modal-sign-up.component.scss'
})
export class ModalSignUpComponent {
  signUpForm: SignUpForm = {
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  }
  passwordRequirementsVisibility: boolean = false;
  errorMessage: string = "";

  constructor(
    private apiService: ApiService, 
    private dialog: MatDialog, 
    private dialogRef: MatDialogRef<ModalSignUpComponent>
  ) {}

  submitForm() {
    this.passwordRequirementsVisibility = false

    if (!this.signUpForm.username ||
        !this.signUpForm.email ||
        !this.signUpForm.password ||
        !this.signUpForm.repeatPassword
    ) {
      this.passwordRequirementsVisibility = true
      this.errorMessage = "Fill all required fields."
      return;
    }

    if (this.signUpForm.password !== this.signUpForm.repeatPassword) {
      this.passwordRequirementsVisibility = true
      this.errorMessage = "Passwords must be the same."
      return;
    }

    const userData: User = {
      username: this.signUpForm.username,
      email: this.signUpForm.email,
      password: this.signUpForm.password
    };

    return this.apiService.signUp(userData).subscribe({
      next: () => {
        this.dialogRef.close();
        this.dialogRef.afterClosed().subscribe(
          {
            next: () => this.dialog.open(
              ModalSignedUpInfoComponent, 
              {
                width: '35%',
                height: 'auto'
              }
            )
          }
        );
      },
      error: ( {error, status} ) => {
        this.passwordRequirementsVisibility = true

        if (status === 422)  //password doesn't meat complexity requirements or email is not valid
        {
          const [{ msg }] = error.detail
          this.errorMessage = msg
        }
        else 
          this.errorMessage = error.detail
      }
    });
  }
}
