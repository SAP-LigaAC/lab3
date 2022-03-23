import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import routes from './routes/bookingsRoutes';
import {StatusCodes, ReasonPhrases} from 'http-status-codes';
import { log, setupLogging, logNetwork} from './utils/logging.js';
import cors from 'cors';

export const initializeApp = () => {

    setupLogging();

    const app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(logNetwork);

    app.use(cors());

    app.use(bodyParser.json());

    app.use(passport.initialize());

    app.get('/', (req, res) => res.send('App is working'));

    app.use('/api', routes);

    app.use((req, res) => {
        res.status(StatusCodes.NOT_FOUND).send({
            message: ReasonPhrases.NOT_FOUND,
            statusCode: StatusCodes.NOT_FOUND,
        });
    });

    app.use(_logErrors);
    app.use(_errorHandler);

    log.info('App successfully bootstrapped');

    return app;
}

function _logErrors(err, req, res, next) {
    log.error(`ERROR occurred for request: ${req.originalUrl}`);
    log.error(err);
    next(err);
}

function _errorHandler(err, req, res, next) {
    res.status(err.code? err.code : StatusCodes.INTERNAL_SERVER_ERROR);
    res.send(err.message? err.message : err);
}