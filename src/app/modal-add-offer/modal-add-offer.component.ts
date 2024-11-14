import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { ApiService } from '../api.service';
import { ModalGeneralInfoComponent } from '../modal-general-info/modal-general-info.component';
import { Offer } from '../models/offer.model';

@Component({
  selector: 'app-modal-add-offer',
  standalone: false,
  templateUrl: './modal-add-offer.component.html',
  styleUrl: './modal-add-offer.component.scss'
})
export class ModalAddOfferComponent {
   offer: Offer

  constructor(private apiService: ApiService, private dialog: MatDialog) {
    this.offer = {
      shop: "",
      price: 0,
      name: "",
      image: null
    }
  }

  pickFile() {
    document.getElementById("image")?.click()
  }

  submitForm() {
    this.apiService.addOffer(this.offer).subscribe(
      {
        next: () => {
          this.dialog.open(ModalGeneralInfoComponent, { data: "An offer has been added successfully!" })
        },
        error: (error: HttpErrorResponse) => {
          this.dialog.open(ModalGeneralInfoComponent, { data: error.message })
        }
      }
    )    
  }
}
