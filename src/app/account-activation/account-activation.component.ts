import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-account-activation',
  standalone: false,  
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.scss'
})
export class AccountActivationComponent {
  token: string = ""
  token_valid: boolean = false

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('verification_token') ?? "";

      this.apiService.checkVerificationToken(this.token).subscribe({
        next: (message) => {
          this.token_valid = true;
          console.log(message);            
        },
        error: (error) => {
          console.log(error);
        }
    });
    })
  }
}
