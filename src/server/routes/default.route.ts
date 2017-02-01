import { Application } from 'express';
import * as path from 'path';

import { UserAPI } from '../api/school/user.api';

export function registerRoutes(app: Application):void {
    app.use( '/api/school/users', UserAPI.apiController() );
    // app.use( '/api/school/agreements', agreementAPI.apiController() );
}