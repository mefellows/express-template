import StatsD from 'node-statsd';
import { metricsPrefix } from '../../config';

let client;

const messages = {
  CLIENT_SOCKET_ERROR: 'Metrics - Error in socket',
};

function socketErrorHandler(error) {
  console.error(messages.CLIENT_SOCKET_ERROR, error); // eslint-disable-line
}

function init(options) {
  client = new StatsD({
    prefix: options.prefix,
    host: options.host,
    port: options.port,
    mock: !options.enabled,
  });
  client.socket.on('error', socketErrorHandler);
}

function now() {
  return new Date().getTime();
}

function timeToNow(time) {
  return now() - time;
}

// Increment a timer, providing the raw timing value
function timing(name, value) {
  client.timing(name, value);
}

// Gauge a stat by a specific value
function guage(name, value) {
  client.guage(name, value);
}

// Increment any arbitrary metric
function increment(name) {
  client.increment(name);
}

// Increment an API calls status code
// and the underlying metric name
function incrementStatus(name, status) {
  increment(`${ name }.status_code.${ status }`);
}

// Sugar for the `timing` function - simply
// determines the duration based on the provided start time
function timingFrom(timer, startTime) {
  timing(timer, timeToNow(startTime));
}

// Generates a Statsd-friendly key from any route
function requestToKey(req) {
  return [`${req.baseUrl ? req.baseUrl.substr(1) : ''}${req.route && req.route.path ? req.route.path.substr(1) : ''}`, req.method].reduce((result, key) => {
    if (key) {
      return `${result}.${key.replace(/[:\/]+/g, '-').toLowerCase()}`;
    }
    return result;
  }, metricsPrefix);
}

// Express middleware to instrument counters
// on all endpoints
function timingMiddleware(req, res, next) {
  const start = Date.now();

  next();

  const key = requestToKey(req);
  if (req.route && req.route.path) {
    incrementStatus(key, res.statusCode);
    timing(key, Date.now() - start);
  } else {
    incrementStatus(key, 404);
  }
}

export default {
  init,
  increment,
  guage,
  incrementStatus,
  timingFrom,
  timingMiddleware,
};
