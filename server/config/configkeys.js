// Importaar el paquete dotenv
import dotenv from 'dotenv';

// Cargo las variables
// de entorno
// En caso de no esta presentes
// el modulo fallara de manera
// silenciosa
dotenv.config();

// Crear un objeto que contendra
// los datos de confguracion que extraera
// de las variables de entorno
export default {
  homeUrl: `${process.env.APP_URL}:${process.env.PORT}`,
  port: process.env.PORT,
  ip: process.env.IP,
};
