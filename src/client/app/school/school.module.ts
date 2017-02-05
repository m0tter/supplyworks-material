import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { HttpModule }     from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule }   from './app.routing';

import { UserService }        from './config/user.service';
import { AgreementService }   from './config/agreement.service';

import { AppComponent }       from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent }      from './config/user.component';
import { NewUserComponent }   from './config/new-user.component';
import { AgreementComponent }  from './config/agreement.component';
import { NewAgreementComponent } from './config/new-agreement.component';

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
    NewUserComponent,
    AgreementComponent,
    NewAgreementComponent
  ],
  providers: [
    UserService,
    AgreementService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ 
    NewUserComponent,
    NewAgreementComponent 
  ]
})
export class SchoolModule { }
