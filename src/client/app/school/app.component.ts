import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'supply-works',
  template: `<md-toolbar color="primary">
    <a md-button routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a md-button routerLink="/users" routerLinkActive="active">Users</a>
    </md-toolbar>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['app/school/app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent { }