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
          data.products.sort((a: Product, b: Product) => {
            return (a.price as number) - (b.price as number);
          });

          const offersElement = document.getElementById('offers');

          if (offersElement) {
            let output = `<p>The best offer: <br> 
              Shop: ${data.products[0].shop}, Product: ${data.products[0].name}, Price: ${data.products[0].price}</p>`;

            output += `<p>Other offers:</p>`;

            for (let i = 1; i < data.products.length; i++) {
              output += `<p>
                Shop: ${data.products[i].shop}, 
                Product: ${data.products[i].name}, 
                Price: ${data.products[i].price}
              </p>`;
            }

            offersElement.innerHTML = output;
          }
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