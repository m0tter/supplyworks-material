import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }        from './config/user.component';
import { AgreementsComponent }    from './config/agreements/agreements.component';
import { AgreementDetailComponent } from './config/agreements/agreement-detail.component';

const appRoutes:Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UserComponent },
    { path: 'agreements', component: AgreementsComponent },
    { path: 'detail/:id', component: AgreementDetailComponent }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
