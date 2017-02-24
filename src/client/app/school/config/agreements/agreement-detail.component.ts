import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Agreement }                from 'supplyworks';

import { AgreementService }         from './agreement.service';

import 'rxjs/add/operator/switchMap';

interface IAgreement extends Agreement {
  selected: boolean;
}

@Component({
  selector: 'agreement-detail',
  templateUrl: 'app/school/config/agreements/agreement-detail.component.html',
  styleUrls: ['app/school/config/agreements/agreement-detail.component.css']
})
export class AgreementDetailComponent implements OnInit {
  private agreement: IAgreement;
  private isNew: boolean;

  constructor(
    private agreementService: AgreementService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void { 
    if( this.route.params['id'] ) {
      this.route.params
        .switchMap( (params: Params) => this.agreementService.getAgreement(params['id']) )
        .subscribe( agreement => this.agreement = <IAgreement>agreement );
      this.isNew = false;
    } else {
      this.agreement = {
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
    }
  }
}