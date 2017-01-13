import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }        from './config/user.component';

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
    }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
