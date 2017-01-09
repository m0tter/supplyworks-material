import * as express from 'express';
import * as morgan from  'morgan';

import * as router from './server/routes/default.route';

let app = express();

app.use(morgan('dev'));

router.registerRoutes(app);

app.use(express.static(__dirname + '/client'))

app.get('/', (req:express.Request, res:express.Response) => {
    res.sendFile(__dirname + 'client/index.html');
});

app.listen(3000, () => {
    console.log('Magic is happening on port 3000');
})