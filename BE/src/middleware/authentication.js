import config from 'config';
import passport from 'passport';
import { log } from '../utils/logging';

function processJwt(req, res, next, scope) {

    const authOptions = config.has('jwt.options') ? config.get('jwt.options') : {session: false};
    const strategy = config.has('jwt.strategy') ? config.get('jwt.strategy') : 'JWT';

    return passport.authenticate(strategy, authOptions, (err, user, securityContext) => {

        if (err || !user) {
            return handleError(res, 401)
         }

        const validScope = securityContext && securityContext.checkLocalScope(scope);

        if (!validScope ) {
            return handleError(res, 403);
        }

        return next();
    })(req, res, next);
}

function handleError(res, code) {
    const response = {code, message:'Authorization failed.'};
    log.error(response);
    return res.status(code).send(response);
}

const authentication = (scope) => {
        return (req, res, next) => processJwt(req, res, next, scope);
    }

export default authentication;