// Importamos dependencias
import ExpHbs from 'express-handlebars';
// Importsmos el administrador de rutas
import path from 'path';

// Exportando funcion de configuracion
// app: Es una instancia de express
export default (app) => {
  // 1 Registro del motor de plantillas
  app.engine(
    'hbs',
    ExpHbs({
      extname: '.hbs',
      defaultLayout: 'mainLayout',
    })
  );

  // Establecr el motor de plantillas
  app.set('view engine', 'hbs');

  // Estableciendo la ruta de las vistas
  app.set('views', path.join(__dirname, '..', 'views'));

  // Retorando la referencia de la instancia de express
  return app;
};
