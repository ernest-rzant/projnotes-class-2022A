#!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('../app');
import app from '@s/app';
// var debug = require('debug')('projnotes:server');
import Debug from 'debug';
// var http = require('http');
import http from 'http';
// import winston from 'winston/lib/winston/config';

import winston from '../config/winston';

// Importando el objeto de las llaves de configuracion
import configkeys from '../config/configkeys';

// Creando instancia del debugger
const debug = Debug('projnotes:server');

/**
 * Get port from environment and store in Express.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(configkeys.port || '5000');
// ExpressJs[] [NODE]
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

function onListening() {
  const addr = server.address();
  const bind =
    typeof addr === 'string'
      ? // ? 'pipe ' + addr
        `pipe ${addr}`
      : // : 'port ' + addr.port;
        `port ${addr.port}`;
  // debug('Listening on ' + bind);
  debug(`Listening on ${bind}`);
  winston.info(`Servidor escuchando... en ${app.get('port')}`);
}
/**
 * Event listener for HTTP server "listening" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  /**
   * Normalize a port into a number, string, or false.
   */

  /**
   * Event listener for HTTP server "error" event.
   */

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // console.error(bind + ' requires elevated privileges');
      winston.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // console.error(bind + ' is already in use');
      winston.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
server.listen(port); // Pone al server a escuchar
// Se registran eventos
server.on('error', onError); // Manejador de eventos
server.on('listening', onListening);
