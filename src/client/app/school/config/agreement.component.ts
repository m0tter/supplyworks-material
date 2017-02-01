import { Component, OnInit }  from '@angular/core';
import { AgreementService }   from './agreement.service';
import { Agreement }          from 'supplyworks';

@Component({
  selector: 'agreements',
  templateUrl: 'app/school/config/agreement.component.html',
  styleUrls: ['app/school/config/agreement.component.css']
})
export class AgreementComponent implements OnInit {

  private showLoading = false;
  private agreements: Agreement[];

  constructor( private agreementService: AgreementService ){ }

  BtnNew_Clicked():void {

  }

  BtnDelete_Clicked():void {

  }

  BtnEdit_Clicked():void {

  }

  ngOnInit():void {
    this.showLoading = true;
    this.agreementService.getAgreements()
      .then(res => {
        this.agreements = res as Agreement[];
        this.showLoading = false;
      })
      .catch(err => this.ErrorHandler(err));
  }

  private ErrorHandler(err: any):void {

  }
}