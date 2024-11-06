import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalSignUpComponent } from '../modal-sign-up/modal-sign-up.component';
import { ApiService } from '../api.service';
import { SignInForm } from '../models/sign-in-form.model';

@Component({
  selector: 'app-modal-sign-in',
  standalone: false,
  templateUrl: './modal-sign-in.component.html',
  styleUrl: './modal-sign-in.component.scss'
})
export class ModalSignInComponent {
  signInForm: SignInForm;
  signInErrorVisibility: boolean | undefined

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
          alert("Signed in"); // TODO: Redirect to page for logged in users
        },
        error: () => {
          this.signInErrorVisibility = true
        }
      }
    );
  }

  openSignUpModal(): void {
    this.signInRef.close();
    this.signInRef.afterClosed().subscribe(
      () => {
        this.dialog.open(ModalSignUpComponent);
      }
    );
  }
}
