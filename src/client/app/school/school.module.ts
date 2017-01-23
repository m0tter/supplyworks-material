import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { HttpModule }     from '@angular/http';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule }   from './app.routing';

import { UserService }        from './config/user.service';

import { AppComponent }       from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent, NewUserComponent } from './config/user.component';

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
    NewUserComponent
  ],
  providers: [
    UserService
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ NewUserComponent ]
})
export class SchoolModule { }
