'use strict';

const Path = require('path');
const dir = __dirname;
const router = {
  routes: Path.join(__dirname, 'routes')
};

module.exports = {
  load: {
    route: (route) => {
      return require(Path.join(router.routes, route))
    }
  }
};
