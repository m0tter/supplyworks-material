import { Component, OnInit, Optional }  from '@angular/core';
import { MdDialogRef }                  from '@angular/material';
import { Agreement }                    from 'supplyworks';

@Component({
  selector: 'new-agreement',
  templateUrl: 'app/school/config/new-agreement.component.html',
  styleUrls: ['app/school/config/new-agreement.component.css']
})
export class NewAgreementComponent implements OnInit{
  newAgreement = true;
  agmt:Agreement;

  constructor( @Optional() public dialogRef: MdDialogRef<NewAgreementComponent> ) { }

  editAgreement(agmt: Agreement):void {
    this.newAgreement = false;
    this.agmt = agmt;
  }

  btnOK_Click(): void {
    this.dialogRef.close(this.agmt);
  }

  btnCancel_Click(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if( this.agmt === undefined ) {
      this.agmt = {
        name: '',
        description: '',
        startDate: new Date(),
        rollingStart: false,
        _id: '',
        maxLessons: 1,
        schoolId: '1234'
      }
    }
  }

}
