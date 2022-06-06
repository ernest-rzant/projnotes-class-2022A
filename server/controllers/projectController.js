import log from '../config/winston';
/* Actions Methods */

// Lista los proyectos
// GET /projects | GET /projects/index
const index = (req, res) => {
  res.send('Listando proyectos 🚧');
  // TODO: Agregar codigo de listado de proyectos
};

// Agrega ideas de proyectos
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addProjectView', {});
  // TODO: Agregar codigo para agregar proyectos
};

// Procesa el formulario que Agrega ideas de proyectos
// POST /projects/add
const addPost = (req, res) => {
  const { errorData } = req;
  // Crear view models para este action method
  let project = {};
  let errorModel = {};
  if (req.errorData) {
    // La validacion fallo
    log.info('Se retorna objeto de error de validacion');
    // Rescatando el objeto validado
    project = errorData.value;
    // Usamos reduce para generar un objeto
    // de errores  partir de inner
    errorModel = errorData.inner.reduce((prev, curr) => {
      // Creamos una variable temporal para evitar
      // el error "no-param*reassing" el cual me
      // exorta a evitar reasignar los valores de
      // los argumentos de una funcion
      const newval = prev;
      newval[`${curr.path}Error`] = curr.message;
      return newval;
    }, {});
    // res.status(200).json(errorData);
  } else {
    // Desestructurando la informacion
    // del formulario del objeto valido
    const { validData } = req;
    log.info('Se retorna objeto Projecto valido');
    // Regresar un objeto con los datos
    // obtenidos del formulario
    // res.status(200).json(validData);
    project = validData;
  }
  // Respondemos con los viewModels generados
  res.render('projects/addProjectView', { project, errorModel });
  // res.status(200).json({ project, errorModel });
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
};
