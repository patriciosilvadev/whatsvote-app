import 'skeleton';
import 'fetch';
import config from './authConfig';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('spoonx/aurelia-auth', baseConfig => {
      baseConfig.configure(config);
    })
    .plugin('xanecs/aurelia-chart')
    .plugin('aurelia-dialog');

  aurelia.start().then(a => a.setRoot());
}
