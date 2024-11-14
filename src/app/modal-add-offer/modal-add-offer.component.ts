import { Component } from '@angular/core';
import { ApiService } from '../api.service';

export interface IOffer {
  shop: string;
  price: number;
  name: string;
  image: HTMLInputElement | null
}


@Component({
  selector: 'app-modal-add-offer',
  standalone: false,
  templateUrl: './modal-add-offer.component.html',
  styleUrl: './modal-add-offer.component.scss'
})
export class ModalAddOfferComponent {
   offer: IOffer

  constructor(private apiService: ApiService,) {
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
        next: (next: any) => console.log(next), //TODO modal with info about added offer
        error: (error: any) => console.log(error) //TODO error message in modal
      }
    )    
  }
}
