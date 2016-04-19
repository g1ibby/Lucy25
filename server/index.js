import http from 'http';
import express, {Router} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';

var app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

app.use(Router());

app.use('/api', api());

app.server.listen(3031);

console.log(`Started on port ${app.server.address().port}`);

export default app;
