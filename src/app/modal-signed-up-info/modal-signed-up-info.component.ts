import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-signed-up-info',
  standalone: false,
  templateUrl: './modal-signed-up-info.component.html',
  styleUrl: './modal-signed-up-info.component.scss'
})
export class ModalSignedUpInfoComponent {
  constructor(private dialogRef: MatDialogRef<ModalSignedUpInfoComponent>) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
