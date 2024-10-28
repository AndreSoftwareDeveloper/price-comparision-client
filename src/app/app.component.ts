import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalSignInComponent } from './modal-sign-in/modal-sign-in.component';
import { ModalSignedUpInfoComponent } from './modal-signed-up-info/modal-signed-up-info.component';

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ModalSignInComponent);
  }
}
