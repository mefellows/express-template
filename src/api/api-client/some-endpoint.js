import request from 'superagent-bluebird-promise';
import { endpointUrl } from '../../config';
import requestMetrics from 'request-metrics';

const endpoint = query => {
  const endpointPromise = request
    .get(endpointUrl)
    .use(requestMetrics)
    .query(query)
    .accept('application/json')
    .type('application/json')
    .then( body => {
      return body;
    });

  return endpointPromise;
};

export default {
  endpoint,
};
