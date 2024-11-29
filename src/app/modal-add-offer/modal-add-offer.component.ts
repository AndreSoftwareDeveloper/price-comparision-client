import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public searchedProduct: string,
    private apiService: ApiService,
    private dialog: MatDialog,
    private modalAddOffer: MatDialogRef<ModalAddOfferComponent>,
  ) {
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

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0)
      this.offer.image = fileInput.files[0];    
  }  

  submitForm() {    
    const formData: Offer = {
      shop: this.offer.shop,
      price: this.offer.price,
      name: this.offer.name,
      image: this.offer.image
    };

    this.apiService.addOffer(formData).subscribe(
      {
        next: () => {
          sessionStorage.setItem('searchedProduct', this.searchedProduct) //TODO move to the separete method
          sessionStorage.setItem('priceUpdated', 'true')

          this.modalAddOffer.close()
          this.modalAddOffer.afterClosed().subscribe(
            () => this.dialog.open(
              ModalGeneralInfoComponent,
              { data: "An offer has been added successfully!" }
            )
          )            
          location.reload();
        },
        error: (error: HttpErrorResponse) => {
          //We don't close ModalGeneralInfoComponent to give the user a chance to enter a correct data
          this.dialog.open(ModalGeneralInfoComponent, { data: error.message })
        }
      }
    )    
  }
}
