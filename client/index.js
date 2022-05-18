/* eslint-disable no-console */
/* global M */

// Incorporando estilos
// a mi bundle
// import './styles/style.css';
import './styles/mystyle.css';

/* Inicializando elementos de materializecss */
document.addEventListener('DOMContentLoaded', () => {
  // Obteniendo la rreferencia a la barra de navegacion lateral
  const sideNav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sideNav);
});
