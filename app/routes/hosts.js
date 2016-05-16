'use strict';

const hostile = require('hostile');

module.exports = [
  {
    method: 'GET',
    path: '/hosts',
    handler: (request, reply) => {
      const addresses = [];

      hostile.get(false).forEach((address) => {
        addresses.push({
          ip: address[0],
          url: address[1]
        });
      });

      reply.view('hosts/index', {addresses}).code(200);
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
