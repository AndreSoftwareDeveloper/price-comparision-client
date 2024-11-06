import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-general-info',
  standalone: false,
  templateUrl: './modal-general-info.component.html',
  styleUrl: './modal-general-info.component.scss'
})
export class ModalGeneralInfo {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {message: string}, 
    private dialogRef: MatDialogRef<ModalGeneralInfo>
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
