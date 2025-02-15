import { Routes } from '@angular/router';

import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'account-activation',
        component: AccountVerificationComponent
    }
];
