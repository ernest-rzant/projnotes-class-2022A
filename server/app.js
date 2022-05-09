/* eslint-disable no-console */

// Preambulo
// Ayuda a manejar errores http
import createError from 'http-errors';
// Ayuda a crear servidores web
import express from 'express';
// Nucleo de node, ayuda al manejo de las rutas
import path from 'path';
// Ayuda al manejo e cookies
import cookieParser from 'cookie-parser';
// Maneja el log de peticiones http
import morgan from 'morgan';

// Las rutas
// var indexRouter = require('./routes/index');
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
// Importando nuestro logger
import { error } from 'console';
// Importndo configurador de plantillas
import templateEngineConfigurator from './config/templeteEngine';
import winston from './config/winston';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import aboutRouter from './routes/about';

// Importando modulos de webpack
// Nucleo de webpack
// Permite incrustar webpack en express
// Permite la actulizacion dinamia de la pagina
// Configuracion
import webpackConfig from '../webpack.dev.config';

// Aqui se crea la instancia de express
// (req, res, next)
const app = express();

// Recuperar el modo de ejecucion
const nodeEnv = process.env.NODE_ENV || 'development';

// Decidiendo si embebemos el webpack middleware
if (nodeEnv === 'development') {
  // Embebiendo webpack a mi aplicacion
  console.log(`🛡 Ejecutando en modo desarrollo 👶🍼`);

  // Estableciendo el modo de webpack en desarrollo
  // en el configurador
  webpackConfig.mode = 'development';

  // Configurando la ruta de HMR (Hot Module Replacemnet)
  // reload=true : Habilita la recarga automatica cuando un archivo Js
  // cambia
  // timeout=1000 : Tiempo de refreco de pagina
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];

  // Agregando el plugin a la configuracion de desarrollo
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Creando el empaquetador a partir de un objeto de configuracion
  const bundler = webpack(webpackConfig);

  // Habilitando el Middleware de webpack en express
  app.use(
    WebpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
    })
  ); // (req, res, next) => {}

  // Habilitando el Middleware de webpack en HMR
  app.use(WebpackHotMiddleware(bundler));
} else {
  console.log(`🛡 Ejecutando en modo produccion ⚙⚙`);
}

// Configuracion del motor de pantillas (templae Engine)
// view engine setup
templateEngineConfigurator(app);

// Todos los middleware globales
// van primero que cualquier otro middleware en la app
app.use(morgan('dev', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Middleware de archivos estaticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registrando las rtas en la APP
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // Registrando el error 404
  winston.error(
    `404 - Not Found: ${req.method} ${req.originalUrl} : IP ${req.ip}`
  );
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Registamos el error en winston
  winston.error(
    `${error.status || 500} : ${err.message} : ${req.method} ${
      req.originalUrl
    } : IP ${req.ip}}`
  );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
// Exportando instancia de app
// usando js moderno
export default app;
