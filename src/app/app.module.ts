import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ModalSignInComponent } from './modal-sign-in/modal-sign-in.component';
import { ModalSignUpComponent } from './modal-sign-up/modal-sign-up.component';
import { AccountActivationComponent } from './account-activation/account-activation.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalSignInComponent,
    ModalSignUpComponent,
    AccountActivationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
