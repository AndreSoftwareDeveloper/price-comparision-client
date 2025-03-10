import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ModalSignInComponent } from './modal-sign-in/modal-sign-in.component';
import { ModalSignUpComponent } from './modal-sign-up/modal-sign-up.component';
import { ModalUpdatePriceComponent } from './modal-update-price/modal-update-price.component';
import { ModalAddOfferComponent } from './modal-add-offer/modal-add-offer.component';

@NgModule({ 
  declarations: [
    AccountVerificationComponent,
    AppComponent,
    HomeComponent,
    ModalSignInComponent,
    ModalSignUpComponent,
    ModalUpdatePriceComponent,
    ModalAddOfferComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ApiService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
