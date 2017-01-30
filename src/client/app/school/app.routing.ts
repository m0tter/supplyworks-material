import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }        from './config/user.component';
import { AgreementComponent }    from './config/agreement.component';

const appRoutes:Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'users',
        component: UserComponent
    },
    {
        path: 'agreements',
        component: AgreementComponent
    }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
