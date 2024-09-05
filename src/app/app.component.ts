import { Component } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'price-comparision-client';
  product: string = ''; 

  constructor(private apiService: ApiService) {}

  onSubmit() {
    this.apiService.getOffers(this.product).subscribe({
      next: (data: DataResponse) => {
        if (data.products.length == 0) {
          console.log(`No offers for: ${this.product}`)
          return;
        }
        else {          
          data.products.forEach( (product) => {
            if (typeof product.price === 'string')
              product.price = parseFloat(product.price.replace(' zł', '').replace(',', '.'));            
            }          
          )
          console.log(data.products)
          return;
        }
      },

      error: (err) => {
        console.error('Error occured:', err);
      }
    });
  }
}

interface Product {
  category: string;
  name: string;
  shop: string;
  price: string | number;
}

interface DataResponse {
  products: Product[];
}