import { Router, Request, Response }  from 'express';
import { Agreement }                  from 'supplyworks';
import * as bparser                   from 'body-parser';

import { AgreementModel, AgreementDocument }  from '../models/agreement.model';

export class AgreementAPI {
  router = Router();

  constructor( ){
    this.buildRouter();
  }

  buildRouter() {
    this.router.get('/', ( req: Request, res: Response ) => {
      AgreementModel.find( {'schoolId': '1234'}, (err: any, agmts: Agreement[]) => {
        if( err ) this.errorHandler( err, res );
        else {
          res.status( 200 ).json( {'success': true, 'data': agmts} )
        }
      });
    });

    this.router.post('/', bparser.json(), ( req: Request, res: Response ) => {
      let newAgmt = new AgreementModel;
      if( req.body ){
        this.modifyAgmt(newAgmt, <Agreement>req.body, (result: AgreementDocument) => {
          res.status( 200 ).json( {'success': true, 'data': result} );
        });
      }
    });

    this.router.delete('/:id', (req: Request, res: Response) => {
      AgreementModel.remove( {_id: req.params.id}, err => {
        if( err ) this.errorHandler( err, res );
        else res.status( 200 ).json( {'success': true, 'data': req.params.id} );
      });
    });

    this.router.put('/:id', bparser.json(), (req: Request, res: Response) => {
      AgreementModel.findById(req.params.id, ( err, agmt ) => {
        if( err ) this.errorHandler( err, res );
        else
          if( req.body ) {
            this.modifyAgmt( agmt, <Agreement>req.body, ( resp: Agreement ) => {
            res.status( 200 ).json( {'success': true, 'data': resp} )})
          }
      });
    });
  }

  private modifyAgmt( dbAgmt: AgreementDocument, data: Agreement, cb: Function): void {
    if( dbAgmt && data ){
      if( data.name )         dbAgmt.name         = data.name;
      if( data.description )  dbAgmt.description  = data.description;
      if( data.maxLessons )   dbAgmt.maxLessons   = data.maxLessons;
      if( data.rollingStart ) dbAgmt.rollingStart = data.rollingStart;
      if( data.startDate )    dbAgmt.startDate    = data.startDate;
      dbAgmt.save( (err, rec) => {
        if( err ) this.errorHandler( err );
        else if( cb ) cb( rec );
      });
    }
  }

  private errorHandler( err: any, res?: Response ) { 
    console.error('An error occurred in agreement.api.ts', err.message || err );
    if( res )
      res.status( 500 ).json( {'success': false, 'data': err.message || err} );
  }

  static apiController(): Router {
    let aa = new AgreementAPI();
    return aa.router;
  }
}