import express from 'express';
import bodyParser from 'body-parser';
//body-parser giúp lấy data từ phía client
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';
require('dotenv').config();

let app = express();
//config app
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIN', 'PUT', 'BATCH', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-width,content-type', 'Upgrade-Insecure-Requests');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(
    cors({
        origin: process.env.REACT_URL,
    }),
);

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8181;
// Port === undefined => port = 8181 => Không crash ứng dụng

app.listen(port, () => {
    //callback
    console.log('BE nodejs is running on the port ' + port);
});
