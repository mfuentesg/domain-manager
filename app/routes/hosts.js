'use strict';

const hostile = require('hostile');
let hosts = [];

module.exports = [
  {
    method: 'GET',
    path: '/hosts',
    handler: (request, reply) => {
      reply.view('hosts/index', {
        addresses: hostile.get(false)
      }).code(200);
    }
  },
  {
    method: ['POST', 'PUT'],
    path: '/hosts',
    handler: (request, reply) => {
      const data = request.payload;

      console.log(hostile.set(data.host_address, data.host_url));
      reply.redirect('/hosts');
    }
  },
  {
    method: 'DELETE',
    path: '/hosts/{id}',
    handler: (request, reply) => {
      const data = request.payload;
      const params = request.params;

      hostile.remove(data.address, params.id);

      reply({'message': 'host deleted'}).code(204);
    }
  },
  {
    method: 'POST',
    path: '/hosts/{id}',
    handler: (request, reply) => {}
  }
];
