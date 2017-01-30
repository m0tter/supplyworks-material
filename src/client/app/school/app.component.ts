import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'supply-works',
  template: `<md-toolbar color="primary">
    <a md-button routerLink="/dashboard" routerLinkActive="active-menu">Dashboard</a>
    <a md-button routerLink="/users" routerLinkActive="active-menu">Users</a>
    <a md-button routerLink="/agreements" routerLinkActive="active-menu">Agreements</a>
    </md-toolbar>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['app/school/app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }