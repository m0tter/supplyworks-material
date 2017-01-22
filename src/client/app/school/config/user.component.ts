import { Component, Optional, ViewEncapsulation }    from '@angular/core';
import { MdDialog, MdDialogRef }  from '@angular/material';

import { UserService }  from './user.service';

@Component({
  selector: 'users',
  templateUrl: 'app/school/config/user.component.html',
  styleUrls: ['app/school/config/user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent {

  constructor( 
    private userService: UserService,
    private dialog: MdDialog 
  ) { }

  NewUser_Clicked() {
    this.dialog.open(NewUserComponent);
  }
}

@Component({
  selector: 'newuser',
  templateUrl: 'app/school/config/newUser.component.html'
})
export class NewUserComponent {
  constructor( @Optional() public dialogRef: MdDialogRef<NewUserComponent> ) { }
 }