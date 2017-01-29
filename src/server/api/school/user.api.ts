import { Router, Request, Response }  from 'express';
import { User }                       from 'supplyworks';
import * as bparser                   from 'body-parser';

import { UserModel, UserDocument } from '../models/user.model';

let router:Router = Router();

export function apiController(): Router {
  router.get('/', (req: Request, res: Response) => {
    UserModel.find({'schoolId': '1234'}, (err: any, tchrs: User[]) => {
      if(err) this.errorHandler(err, res);
      if(tchrs) {
        res.status(200).json({'success': true, data: tchrs});
      } else {
        res.status(200).json({'success': true, data: null});
      }
    });
  });

  router.post('/', bparser.json(), (req: Request, res: Response) => {
    let newUser: UserDocument = new UserModel;
    let data:User = req.body;
    if( data ) {
      console.log(data.schoolId);
      if( data.firstName )  newUser.firstName = data.firstName;
      if( data.lastName )   newUser.lastName  = data.lastName;
      if( data.email )      newUser.email     = data.email;
      if( data.schoolId )   newUser.schoolId  = data.schoolId;
      if( data.tchrId )     newUser.tchrId    = data.tchrId;
      newUser.save((err, result) => {
        if( err ) errorHandler( err, res );
        res.status(200).json({'success': true, data: result});
      });
    }
  });

  router.delete('/:id', (req: Request, res: Response) => {
    UserModel.remove({_id: req.params.id}, err => {
      if(err) this.errorHandler(err, res);
      else res.status(200).json({'success': true, 'data': req.params.id});
    });
  });

  router.put('/:id', bparser.json(), (req: Request, res: Response) => {
    UserModel.findById(req.params.id, (err, user) => {
      if( err ) errorHandler(err);
      else
        if( req.body ) {
          modifyUser( user, <User>req.body, ( resp: User ) => { 
            res.status(200).json({'success': true, 'data': resp})})
        }
    });
  });

  return router;
}

function modifyUser( dbUser: UserDocument, data: User, cb: Function ): void {
  if( dbUser && data ){
    if( data.firstName )  dbUser.firstName = data.firstName;
    if( data.lastName )   dbUser.lastName = data.lastName;
    if( data.email )      dbUser.email = data.email;
    if( data.schoolId )   dbUser.schoolId = data.schoolId;
    if( data.tchrId )     dbUser.tchrId = data.tchrId;
    dbUser.save( (err, rec) => {
      if( err ) 
        errorHandler(err);
      else
        if( cb ) cb(rec); 
    })
  }
}

function errorHandler(error: any, response?: Response): void {
  console.error('An error occurred in user.api.ts ', error.message || error);
  if(response)
    response.status(500).json({'success': false, 'message': error.message || error});
}