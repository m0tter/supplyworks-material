import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { HttpModule }     from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule }   from './app.routing';

import { UserService }        from './config/user.service';
import { AgreementService }   from './config/agreements/agreement.service';
import { ErrorService }       from './error.service';

import { AppComponent }             from './app.component';
import { DashboardComponent }       from './dashboard/dashboard.component';
import { UserComponent }            from './config/user.component';
import { AgreementsComponent }      from './config/agreements/agreements.component';
import { AgreementDetailComponent } from './config/agreements/agreement-detail.component';

@NgModule({
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    AgreementsComponent,
    AgreementDetailComponent
  ],
  providers: [
    UserService,
    AgreementService,
    ErrorService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ 
  ]
})
export class SchoolModule { }
