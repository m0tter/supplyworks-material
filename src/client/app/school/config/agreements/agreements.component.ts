import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agreement }              from 'supplyworks';

import { AgreementService }   from './agreement.service';

interface IAgreement extends Agreement { selected: boolean; }

@Component({
  selector: 'agreements',
  templateUrl: 'app/school/config/agreements/agreements.component.html',
  styleUrls: ['app/school/config/agreements/agreements.component.css']
})
export class AgreementsComponent implements OnInit {
  private agreements: IAgreement[];
  private selected: IAgreement;
  private showLoading = false;
  private editEnabled = false;
  private deleteEnabled = false;

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
    this.router.navigate(['detail/0'], { relativeTo: this.route });
  }

  btnEdit_Clicked(): void {
    this.router.navigate(['/agreements/detail/', this.selected._id])
  }

  chkSelected_Click($index: number): void {
    this.agreements[$index].selected = !this.agreements[$index].selected;
    this.checkButtons();
  }

  deleteAgreement(agreement: IAgreement): void {
    this.agreementService.deleteAgreement(agreement)
      .then( res => { if ( res ) this.agreements.splice( this.agreements.indexOf(agreement), 1 ); })
      .catch( err => this.ErrorHandler( err ));
  }

  checkButtons(): void {
    this.editEnabled = false;
    this.deleteEnabled = false;
    if( this.agreements ){
      let count = this.agreements.filter( agreement => agreement.selected ).length;
      if( count ) this.deleteEnabled = true;
      if( count === 1 ) {
        this.selected = this.agreements.find( agreement => agreement.selected )[0];
        this.editEnabled = true;
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