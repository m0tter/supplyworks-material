import { Component, Optional, OnInit }    from '@angular/core';
import { MdDialog, MdDialogRef }          from '@angular/material';
import { User }                           from 'supplyworks';

import { UserService }      from './user.service';
import { NewUserComponent } from './new-user.component';

interface user extends User { selected: boolean; }

@Component({
  selector: 'users',
  templateUrl: 'app/school/config/user.component.html',
  styleUrls: ['app/school/config/user.component.css']
})
export class UserComponent implements OnInit{
  private users: user[];
  private showLoading = false;
  private btnEditDisabled = true;
  private btnDeleteDisabled = true;

  constructor( 
    private userService: UserService,
    private dialog: MdDialog 
  ) { }

  NewUser_Clicked() {
    let dialogRef = this.dialog.open( NewUserComponent );
    dialogRef.afterClosed().subscribe( result => {
      if( result ) 
        this.userService.createUser( result )
          .then(res => this.users.push(res as user))
          .catch(err => this.errorHandler(err));
    });
  }

  DelUser_Clicked() {
    for( let u of this.users ) {
      if( u.selected ) { 
        this.userService.deleteUser( u )
          .then( res => { if( res ) this.users.splice( this.users.indexOf( u ), 1); } )
          .catch( err => this.errorHandler( err ));
      }
    }
  }

  UserSelected_Clicked($index:number) {
    this.users[$index].selected = !this.users[$index].selected;
    this.CheckButtons();
  }

  CheckButtons() {
    var counter = 0;
    for( let u of this.users ) {
      if( u.selected ) {
        counter++;
      }
    }
    if(counter === 1) 
      this.btnEditDisabled = false;
    else
      this.btnEditDisabled = true;
    
    if(counter > 0)
      this.btnDeleteDisabled = false;
    else
      this.btnDeleteDisabled = true;
  }

  EditUser_Clicked() {
    var u = this.users.find(e => e.selected );
    var dialogRef = this.dialog.open( NewUserComponent );
    dialogRef.componentInstance.editUser({...u});
    dialogRef.afterClosed().subscribe( res => {
      if( res ) {
        this.userService.editUser( res )
          .then(() => {
            res.selected = false;
            this.users.splice( this.users.indexOf( u ), 1, res );
            this.CheckButtons();
          })
          .catch( err => this.errorHandler(err) );
      }
    });
  }

  ngOnInit() {
    this.showLoading = true;
    this.userService.getUsers()
      .then(res => {
        this.users = res as user[];
        this.showLoading = false;
      })
      .catch(err => this.errorHandler(err));
  }

  private errorHandler(err: any):void {
    console.error(err);
    // TODO display error to user
  }
}
