import * as express     from 'express';
import * as morgan      from 'morgan';
import * as mongoose    from 'mongoose';

import * as router      from './server/routes/default.route';
import * as dbConfig    from './server/config/db.config';

let app = express();

mongoose.connect(dbConfig.connectionStringLocalDB);

app.use(morgan('dev'));

router.registerRoutes(app);

app.use(express.static(__dirname + '/client'));

app.get('/|/dashboard', (req:express.Request, res:express.Response) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(3000, () => {
    console.log('Magic is happening on port 3000');
})