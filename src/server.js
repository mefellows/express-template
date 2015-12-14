import path from 'path';
import 'babel-core/polyfill';
import express from 'express';
import metrics from './api/metrics/metrics';
import config from './config';
import bodyParser from 'body-parser';

const createServer = () => {
  const server = global.server = express();
  const port = process.env.PORT || 5000;
  server.set('port', port);

  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(express.static(path.join(__dirname, 'public')));
  server.use(bodyParser.json());

  //
  // Register API middleware
  // -----------------------------------------------------------------------------

  // Inject startTime into all requests for instrumentation purposes
  const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  };
  server.use(allowCrossDomain);
  server.use(metrics.timingMiddleware);

  // Endpoints
  server.use('/users', require('./api/users'));
  server.get('/_healthcheck', (req, res) => res.send('OK'));

  metrics.init({
    prefix: `${config.metricsPrefix}.`,
    host: config.metricsHost,
    port: config.metricsPort,
    enabled: config.metricsEnabled,
  });

  //
  // Launch the server
  // -----------------------------------------------------------------------------
  const s = server.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`The server is running at http://localhost:${port}/`);
  });

  function stop() {
    s.close();
  }

  return { stop };
};

export default { createServer };
