import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalSignUpComponent } from '../modal-sign-up/modal-sign-up.component';
import { ApiService } from '../api.service';

interface SignInForm {
  emailOrUsername: string;
  password: string;
}

@Component({
  selector: 'app-modal-sign-in',
  standalone: false,
  templateUrl: './modal-sign-in.component.html',
  styleUrl: './modal-sign-in.component.scss'
})
export class ModalSignInComponent {
  signInForm: SignInForm;
  signInErrorVisibility: boolean | undefined
  errorMessage: string = "";

  constructor(private signInRef: MatDialogRef<ModalSignInComponent>, 
              private dialog: MatDialog,
              private apiService: ApiService) {
    this.signInForm = {
      emailOrUsername: '',
      password: ''
    }
  }
  
  submitForm() {
    this.signInErrorVisibility = false
    if (!this.signInForm.emailOrUsername || 
        !this.signInForm.password) {
      alert("Fill all required fields.");
      return;
    }
  
    const loginData = new URLSearchParams();
    loginData.set('username', this.signInForm.emailOrUsername);
    loginData.set('password', this.signInForm.password);
  
    return this.apiService.signIn(loginData.toString()).subscribe(
      {
        next: () => {
          alert("Zalogowane"); // TODO: Przekieruj na stronę dla zalogowanych użytkowników
        },
        error: (error: Error) => {
          this.signInErrorVisibility = true
          this.errorMessage = error.message
        }
      }
    );
  }

  openSignUpModal(): void {
    this.signInRef.close();
    this.signInRef.afterClosed().subscribe(() => {
      this.dialog.open(ModalSignUpComponent);
    });
  }
}
