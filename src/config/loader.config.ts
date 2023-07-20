import { devConfig } from './dev.config';
import { prodConfig } from './prod.config';
import { testConfig } from './test.config';

export const loadConfig = () => {
  const configs = [];
  if (process.env.NODE_ENV == 'prod') {
    console.log('Loading PROD');

    configs.push(prodConfig);
  } else if (process.env.NODE_ENV == 'test') {
    configs.push(testConfig);
  } else {
    configs.push(devConfig);
  }
  return configs;
};
