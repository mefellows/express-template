require('dotenv').load();

const getConfig = key => {
  if (key in process.env) {
    return process.env[key];
  }
  throw new Error(`Configuration Error: required environment variable "${key}" not found.`);
};

const getConfigAsBool = key => getConfig(key) === 'true';

export default {
  metricsPrefix: getConfig(`METRICS_PREFIX`),
  metricsHost: getConfig(`METRICS_HOST`),
  metricsIsEnabled: getConfigAsBool('METRICS_ENABLED'),
  pendpointUrl: getConfig('API_ENDPOINT'),
  auditLoggerPath: getConfig('LOG_PATH'),
  auditLoggerLevel: getConfig('LOG_LEVEL'),
  environment: getConfig('ENVIRONMENT'),
  version: getConfig('VERSION'),
};
