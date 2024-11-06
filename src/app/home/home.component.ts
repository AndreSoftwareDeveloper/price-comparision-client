import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../api.service';
import { ModalUpdatePriceComponent } from '../modal-update-price/modal-update-price.component';
import { ModalGeneralInfoComponent } from '../modal-general-info/modal-general-info.component';
import { DataResponse } from '../models/data-response.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'home-root',  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title: string = 'price-comparision-client';
  product: string = '';
  data?: DataResponse;
  
  constructor(private apiService: ApiService, private dialog: MatDialog) {}  

  onSubmit() {
    this.apiService.searchOffers(this.product).subscribe(
      {
        next: (data: DataResponse) => {
          if (data.products.length == 0) {
            const message = `No offers for: ${this.product}`
            this.dialog.open(ModalGeneralInfoComponent, { data: message})
            return;
          }
          
          else {          
            data.products.forEach( (product) => {
              if (typeof product.price === 'string')
                product.price = parseFloat(product.price.replace(' zł', '').replace(',', '.'));            
              }
            )
            data.products.sort((a: Product, b: Product) => {
              return (a.price as number) - (b.price as number);
            });

            this.data = data;
          }
        },

        error: (error) => {
          const message = `An error occurred: ${error.message}`
          this.dialog.open(ModalGeneralInfoComponent, { data: message })
        }
      }
    );
  }

  openUpdatePriceModal(id: number) {
    this.dialog.open(ModalUpdatePriceComponent, {
      data: { id: id }
    })
  }
}
