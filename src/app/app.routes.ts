import { Routes } from '@angular/router';

import { AccountActivationComponent } from './account-activation/account-activation.component';
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
        component: AccountActivationComponent
    }
];
