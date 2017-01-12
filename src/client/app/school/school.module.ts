import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

import { routing }        from './app.routing';
import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  bootstrap: [ AppComponent ]
})
export class SchoolModule { }
