import { Component, OnInit }  from '@angular/core';
import { Agreement }          from 'supplyworks';

import { AgreementService }   from './agreement.service';

interface IAgreement extends Agreement { selected: boolean; }

@Component({
  selector: 'agreements',
  templateUrl: 'app/school/config/agreements/agreements.component.html',
  styleUrls: ['app/school/config/agreements/agreements.component.css']
})
export class AgreementsComponent implements OnInit {
  private agreements: IAgreement[];
  private showLoading = false;
  private editEnabled = false;
  private deleteEnabled = false;

  constructor( private agreementService: AgreementService ) { }

  getAgreements(): void {
    this.showLoading = true;
    this.agreementService.getAgreements()
      .then( resp => { 
        this.agreements = resp as IAgreement[]; 
        this.showLoading = false;
      })
      .catch( err => this.ErrorHandler(err) );
  }

  checkButtons(): void {
    this.editEnabled = false;
    this.deleteEnabled = false;
    if( this.agreements ){
      let count = this.agreements.filter( agreement => agreement.selected ).length;
      if( count ) this.deleteEnabled = true;
      if( count === 1 ) this.editEnabled = true;
    }
  }

  ngOnInit(): void { 
    this.getAgreements();
  }

  private ErrorHandler(err: any):void {
    // TODO give this some meat
  }
}