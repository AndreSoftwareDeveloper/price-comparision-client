import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../api.service';
import { ModalUpdatePriceComponent } from '../modal-update-price/modal-update-price.component';
import { ModalGeneralInfoComponent } from '../modal-general-info/modal-general-info.component';
import { DataResponse } from '../models/data-response.model';
import { Product } from '../models/product.model';
import { ModalSignInComponent } from '../modal-sign-in/modal-sign-in.component';
import { ModalAddOfferComponent } from '../modal-add-offer/modal-add-offer.component';

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

  ngOnInit() {
    var priceUpdated = sessionStorage.getItem('priceUpdated')
    var searchedProduct = sessionStorage.getItem('searchedProduct')
    
    if (priceUpdated == 'true' && searchedProduct != null && searchedProduct != undefined) {      
      this.handleSearchOffersResponse(searchedProduct)
      sessionStorage.setItem('priceUpdated', 'false')
    }    
  }

  onSubmit() {
    this.handleSearchOffersResponse(this.product)
  }

  openDialog() {
    this.dialog.open(ModalSignInComponent);
  }

  handleSearchOffersResponse(product: string) {
    this.apiService.searchOffers(product).subscribe(
      {        
        next: (data: DataResponse) => {
          if (!product) {
            const message = "Please enter the product you are looking for."
            this.dialog.open(ModalGeneralInfoComponent, {data: message})
            return
          }
          
          if (data.products.length == 0) {
            const message = `No offers for: ${product}`
            this.dialog.open(ModalGeneralInfoComponent, {data: message})
            return;
          }
          else {
            const productSearchTextarea = document.getElementById("product")!
            productSearchTextarea.style.marginTop = '0'

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
          this.dialog.open(ModalGeneralInfoComponent, { data: error.message })
        }
      }
    );
  }

  openUpdatePriceModal(id: number, searchedProduct: string) {
    this.dialog.open(ModalUpdatePriceComponent, {
      data: { 
        id: id,
        product: searchedProduct
      }
    })
  }

  openAddOfferModal() {
    this.dialog.open(ModalAddOfferComponent)
  }
}
