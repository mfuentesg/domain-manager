'use strict';

const Path = require('path');

const Hapi = require('hapi');
const server = new Hapi.Server();

const App = require(Path.join(__dirname, 'app', 'app'));

server.connection({port: 3000, host: '127.0.0.1'});

server.register([require('inert'), {
  register: require('hapi-sass'),
  options: {
    src: Path.join(__dirname, 'vendor', 'sass'),
    dest: Path.join(__dirname, 'public', 'styles'),
    force: true,
    debug: true,
    routePath: '/public/styles/{file}.css',
    outputStyle: 'nested',
    sourceComments: true,
    srcExtension: 'scss'
  }
}], (err) => {
  if (err) console.error(err);
});

server.register(require('vision'), (err) => {
  if (err) console.error(err);

  server.views({
    engines: { jade: require('jade') },
    path: Path.join(__dirname, 'app', 'views'),
    compileOptions: {
      pretty: true
    }
  });
});

server.route(App.load.route('hosts'));

server.route({
  method: 'GET',
  path: '/public/{param*2}',
  handler: {
    directory: {
      path: Path.join(__dirname, 'public')
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply.redirect('/hosts');
  }
})

server.start((err) => {
  if (err) console.error(err);

  console.info(`Server running at: ${server.info.uri}`);
});
