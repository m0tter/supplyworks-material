import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agreement }              from 'supplyworks';

import { AgreementService }   from './agreement.service';

interface IAgreement extends Agreement { selected: boolean; }

@Component({
  moduleId: module.id,
  selector: 'agreements',
  templateUrl: 'agreements.component.html',
  styleUrls: ['agreements.component.css']
})
export class AgreementsComponent implements OnInit {
  private agreements: IAgreement[];
  private selected: IAgreement;
  private showLoading = false;
  private editDisabled = true;
  private deleteDisabled = true;

  constructor( 
    private agreementService: AgreementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  getAgreements(): void {
    this.showLoading = true;
    this.agreementService.getAgreements()
      .then( resp => { 
        this.agreements = resp as IAgreement[]; 
        this.showLoading = false;
      })
      .catch( err => this.ErrorHandler(err) );
  }

  btnDelete_Clicked(): void {
    for( let a of this.agreements ){
      if( a.selected ) this.deleteAgreement( a );
    }
  }

  btnNew_Clicked(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  btnEdit_Clicked(): void {
    this.router.navigate([this.selected._id], { relativeTo: this.route });
  }

  chkSelected_Clicked($index: number): void {
    this.agreements[$index].selected = !this.agreements[$index].selected;
    this.checkButtons();
  }

  deleteAgreement(agreement: IAgreement): void {
    this.agreementService.deleteAgreement(agreement)
      .then( res => { if ( res ) this.agreements.splice( this.agreements.indexOf(agreement), 1 ); })
      .catch( err => this.ErrorHandler( err ));
  }

  checkButtons(): void {
    this.editDisabled = true;
    this.deleteDisabled = true;
    if( this.agreements ){
      let agreements = this.agreements.filter( agreement => agreement.selected );
      if( agreements.length ) this.deleteDisabled = false;
      if( agreements.length === 1 ) {
        this.selected = agreements[0];
        this.editDisabled = false;
      }
    }
  }

  ngOnInit(): void { 
    this.getAgreements();
  }

  private ErrorHandler(err: any):void {
    // TODO give this some meat
  }
}