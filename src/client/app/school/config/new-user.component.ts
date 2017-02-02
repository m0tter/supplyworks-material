import { Component, OnInit, Optional }  from '@angular/core';
import { MdDialogRef }                  from '@angular/material';
import { User }                         from 'supplyworks';

@Component({
  selector: 'newuser',
  templateUrl: 'app/school/config/new-user.component.html',
  styleUrls: ['app/school/config/new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User;
  newuser = true;

  constructor( @Optional() public dialogRef: MdDialogRef<NewUserComponent> ) { }

  btnOK_Click() {
    this.dialogRef.close(this.user);
  }

  btnCancel_Click() {
    this.dialogRef.close();
  }

  editUser(user: User){
    this.user = user;
    this.newuser = false;
  }

  ngOnInit() {
    if( this.user === undefined ){
      this.user = {
        firstName: '',
        lastName: '',
        tchrId: '',
        email: '',
        schoolId: '1234'
      };
    }
  }

 }