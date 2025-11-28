//este es el middleware

const { Router } = require('express');

//definir la ruta del consumo del endpoint

const cursosController = require('../Controllers/cursosControl.js');

const cursosRouter = Router();

//definir cada endpoint

cursosRouter.get('/', cursosController.getCursos);

//Definir busqueda por id
cursosRouter.get('/:id',cursosController.getCursos);

/*post
cursosRouter.post('/registrar-curso', cursosController.createCurso);

//put
cursosRouter.post('/:id', cursosController.updateCurso);

//delete
cursosRouter.delete('/:id', cursosController.deleteCurso);
*/

module.export = cursosRouter;