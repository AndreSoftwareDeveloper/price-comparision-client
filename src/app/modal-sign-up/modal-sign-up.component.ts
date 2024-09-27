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
  signUpForm: SignUpForm;

  constructor(private apiService: ApiService) {
    this.signUpForm = {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
  }

  submitForm() {
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

    return this.apiService.signUp(userData).subscribe(
      () => {
        alert("dobrze") //TODO message in pop-up
      },
      (error) => {
        alert("źle: " + error)
      }
    );
  }
}
