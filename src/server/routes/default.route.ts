import { Application } from 'express';
import * as path from 'path';

import * as userAPI from '../api/school/user.api';

export function registerRoutes(app: Application):void {
    app.use( '/api/school/users', userAPI.apiController() );
}