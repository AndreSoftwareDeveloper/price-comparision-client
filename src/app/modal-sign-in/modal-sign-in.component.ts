import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalSignUpComponent } from '../modal-sign-up/modal-sign-up.component';

@Component({
  selector: 'app-modal-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './modal-sign-in.component.html',
  styleUrl: './modal-sign-in.component.scss'
})
export class ModalSignInComponent {
  constructor(private signInRef: MatDialogRef<ModalSignInComponent>, private signUpRef: MatDialogRef<ModalSignUpComponent>, private dialog: MatDialog) {}
  
  openSignUpModal(): void {
    this.signInRef.afterClosed().subscribe(() => {
      this.dialog.open(ModalSignUpComponent);
    });
  }
}
