import { Component, Optional, OnInit }    from '@angular/core';
import { MdDialog, MdDialogRef }  from '@angular/material';

import { UserService }  from './user.service';
import { Teacher }      from 'supplyworks';

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
    let dialogRef = this.dialog.open( NewUserComponent );
    dialogRef.afterClosed().subscribe( result => {
      if( result ) this.userService.createUser( result );
    });  
  }
}

@Component({
  selector: 'newuser',
  templateUrl: 'app/school/config/newUser.component.html',
  styleUrls: ['app/school/config/newUser.component.css']
})
export class NewUserComponent implements OnInit {
  private newuser: Teacher;

  constructor( @Optional() public dialogRef: MdDialogRef<NewUserComponent> ) { }

  btnOK_Click() {
    this.dialogRef.close(this.newuser);
  }

  btnCancel_Click() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.newuser = {
      firstName: '',
      lastName: '',
      tchrId: '',
      email: '',
      schoolId: '1234'
    }
  }

 }