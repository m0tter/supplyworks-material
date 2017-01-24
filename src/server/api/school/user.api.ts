import { Router, Request, Response } from 'express';
import { Teacher } from 'supplyworks';
import * as bparser from 'body-parser';

import { TeacherModel } from '../models/teacher.model';

let router:Router = Router();

export function apiController(): Router {
  router.get('/', (req: Request, res: Response) => {
    TeacherModel.find({'schoolId': '1234'}, (err: any, tchrs: Teacher[]) => {
      if(err) this.errorHandler(err, res);
      if(tchrs) {
        res.status(200).json({'success': true, data: tchrs});
      } else {
        res.status(200).json({'success': true, data: null});
      }
    });
  });

  router.post('/', bparser.json(), (req: Request, res: Response) => {
    let tchr = new TeacherModel;
    if( req.body ) {
      tchr.
    }
  })

  return router;
}

function errorHandler(error: any, response?: Response): void {
  console.error('An error occurred in user.api.ts ', error.message || error);
  if(response)
    response.status(500).json({'success': false, 'message': error.message || error});
}