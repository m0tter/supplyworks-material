import { Router, Request, Response }  from 'express';
import { Agreement }                  from 'supplyworks';
import * as bparser                   from 'body-parser';

import { AgreementModel, AgreementDocument }  from '../models/agreement.model';

let router:Router = Router();

export function apiController(): Router {

  return router;
}