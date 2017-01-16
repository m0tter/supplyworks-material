import { Component, Optional }    from '@angular/core';
import { MdDialog, MdDialogRef }  from '@angular/material';

import { UserService }  from './user.service';

@Component({
  selector: 'users',
  templateUrl: 'app/school/config/user.component.html',
  styleUrls: ['app/school/config/user.component.css']
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
  template: `<p>new user dialog</p>
  <p><label><input #dialogInput></label></p>
  <p><button md-button (click)="dialogRef.close(dialogInput.value)">Close</button></p>`,
})
export class NewUserComponent {
  constructor( @Optional() public dialogRef: MdDialogRef<NewUserComponent> ) { }
 }