import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Agreement }                from 'supplyworks';

import { AgreementService }         from './agreement.service';
import { ErrorService }             from 'errorService';

import 'rxjs/add/operator/switchMap';

interface IAgreement extends Agreement { }

@Component({
  moduleId: module.id,
  selector: 'agreement-detail',
  templateUrl: 'agreement-detail.component.html',
  styleUrls: ['agreement-detail.component.css']
})
export class AgreementDetailComponent implements OnInit {
  private agreement: IAgreement;
  private isNew: boolean;

  constructor(
    private agreementService: AgreementService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  btnCancel_Clicked(): void {
    this.goBack();
  }

  btnSave_Clicked(): void {
    if( this.isNew ) {
      this.agreementService.createAgreement(this.agreement)
        .then( () => this.goBack() )
        .catch( err => this.errorHandler( err ));
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    if( this.route.params ){
      this.route.params
        .switchMap( (params: Params) => {
          if( params['id'] !== 'new' ) {
            this.isNew = false;
            return this.agreementService.getAgreement(params['id']);
          } else {
            let agreement = {
              name: '',
              description: '',
              maxLessons: 0,
              rollingStart: false,
              schoolId: '',
              selected: false,
              startDate: new Date(),
              _id: ''
            }
            this.isNew = true;
            return Promise.resolve(agreement);
          }
        })
        .subscribe( agreement => this.agreement = <IAgreement>agreement );
    }
  }
}