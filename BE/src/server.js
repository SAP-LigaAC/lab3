import xsenv from '@sap/xsenv';
import passport from 'passport';
import fs from 'fs';
import { JWTStrategy } from '@sap/xssec';
import { initializeApp } from "./app";
import { log } from "./utils/logging.js";

xsenv.loadEnv();

const defaultEnvFile = './config/default-env.json';

if (fs.existsSync(defaultEnvFile)) {
  xsenv.loadEnv(defaultEnvFile);
}

var services = xsenv.getServices({
  xsuaa: {
    label: 'xsuaa'
  }
});

passport.use(new JWTStrategy(services.xsuaa));

const app = initializeApp();

const port = process.env.PORT || 4001;
const host = "0.0.0.0";

const server = app.listen(port, host, () => {
  log.info(`App listening on port: ${server.address().port}`);
});
