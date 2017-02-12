import { Component, OnInit }  from '@angular/core';
import { MdDialog }           from '@angular/material';
import { Agreement }          from 'supplyworks';
import { AgreementService }   from './agreement.service';
import { NewAgreementComponent } from './new-agreement.component';

interface agreement extends Agreement {
  selected: boolean;
}

@Component({
  selector: 'agreements',
  templateUrl: 'app/school/config/agreement.component.html',
  styleUrls: ['app/school/config/agreement.component.css']
})
export class AgreementComponent implements OnInit {

  private showLoading = false;
  private agreements: agreement[];
  private btnEditDisabled = true;
  private btnDeleteDisabled = true;

  constructor( 
    private agreementService: AgreementService,
    private dialog: MdDialog 
  ) { }

  getAgreements(): void {
    this.showLoading = true;
    this.agreementService.getAgreements()
      .then( resp => { 
        this.agreements = resp as agreement[]; 
        this.showLoading = false;
      })
      .catch( err => this.ErrorHandler(err) );
  }

  btnNew_Clicked():void {
    let dialogRef = this.dialog.open(NewAgreementComponent, { height: '400px', width: '600px' });
    dialogRef.afterClosed().subscribe( agmt => {
      if( agmt ) {
        this.agreementService.createAgreement( agmt )
          .then( newAgmt => { this.agreements.push( newAgmt as agreement ); } )
          .catch( err => this.ErrorHandler(err) )
      }
    });
  }

  btnDelete_Clicked():void {
    for( let a of this.agreements ){
      if(a.selected) {
        this.agreementService.deleteAgreement(a)
          .then( res => { if ( res ) this.agreements.splice( this.agreements.indexOf(a), 1 ) } )
          .catch( err => this.ErrorHandler(err) );
      }
    }
  }

  btnEdit_Clicked():void {
    var a = this.agreements.find(e => e.selected );
    var dialogRef = this.dialog.open( NewAgreementComponent );
    dialogRef.componentInstance.editAgreement({...a});
    dialogRef.afterClosed().subscribe( res => {
      if( res ) {
        this.agreementService.editAgreement( res )
          .then(() => {
            res.selected = false;
            this.agreements.splice( this.agreements.indexOf( a ), 1, res );
            this.checkButtons();
          })
          .catch( err => this.ErrorHandler(err) );
      }
    });
  }

  chkSelected_Clicked($index: number):void {
    this.agreements[$index].selected = !this.agreements[$index].selected;
    this.checkButtons();
  }

  checkButtons():void {
    var counter = 0;
    for( let a of this.agreements ) {
      if( a.selected ) {
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

  ngOnInit():void {
    this.getAgreements();
  }

  private ErrorHandler(err: any):void {

  }
}