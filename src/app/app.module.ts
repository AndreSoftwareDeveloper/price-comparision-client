import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AccountActivationComponent } from './account-activation/account-activation.component';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ModalSignInComponent } from './modal-sign-in/modal-sign-in.component';
import { ModalSignUpComponent } from './modal-sign-up/modal-sign-up.component';

@NgModule({ 
  declarations: [
    AccountActivationComponent,
    AppComponent,
    HomeComponent,
    ModalSignInComponent,
    ModalSignUpComponent
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
