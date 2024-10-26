import { Component } from '@angular/core';

import { ApiService } from '../api.service';

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

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

  constructor(private apiService: ApiService) {}

  submitForm() {
    this.passwordRequirementsVisibility = false

    if (!this.signUpForm.username ||
        !this.signUpForm.email ||
        !this.signUpForm.password ||
        !this.signUpForm.repeatPassword
    ) {
      alert("Fill all required fields.")
      return;
    }

    if (this.signUpForm.password !== this.signUpForm.repeatPassword) {
      alert("Passwords must be the same.")
      return;
    }

    const userData = {
      username: this.signUpForm.username,
      email: this.signUpForm.email,
      password: this.signUpForm.password
    };

    return this.apiService.signUp(userData).subscribe({
      next: () => {
        alert(`Your account is almost ready!\n
          Check Your mailbox. We have sent a message to the address provided.\n
          Follow the instructions provided in the message.\n\n
          Can't find the message? Sending Your message may take a while.\n
          Wait for a moment or check spam.`)
      },
      error: ( {error, status} ) => {
        this.passwordRequirementsVisibility = true

        if (status === 422) { //password doesn't meat complexity requirements or email is not valid          
          const [{ msg }] = error.detail
          this.errorMessage = msg
        }
        else 
          this.errorMessage = error.detail
      }
    });
  }
}
