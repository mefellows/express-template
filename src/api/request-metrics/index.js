import { metricsPrefix } from '../../config';
import metrics from 'metrics';
import superagentTiming from 'superagent-timing';

function urlToKey(url) {
  return `${metrics.requests.urlToKey(url).replace(/\./g, '-')}`;
}

function metricsHandler(metrics) {
  const { request: { url, method }, duration, response: { statusCode, text } } = metrics;
  const prefix = `${metricsPrefix}.api.${urlToKey(url)}.${method}`.toLowerCase();

  metrics.timing(`${prefix}.time`, duration);
  metrics.increment(`${prefix}.count`);
  metrics.increment(`${prefix}.status_code.${statusCode}`);
  metrics.guage(`${prefix}.response_size`, text.length);
}

function errorHandler(error) {
  console.error(error); // eslint-disable-line
}

export default superagentTiming(metricsHandler, errorHandler);
