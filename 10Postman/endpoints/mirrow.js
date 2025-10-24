const mirrow = (req,res) =>{

    const methods = [{
        method: 'POST',
        hasBody : true,
        purpose : "El metodo POST se utiliza para enviar una entidad a un recurso especifico causando a menudo un cambio en el estado o efectos secundarios en el servidor"
    },
    {
        method: 'PUT',
        hasBody: true,
        purpose : "El metodo PUT reemplaza todas las representaciones actuales del recurso de destino con carga util de la peticion"
    },
    {
        method : 'PATCH',
        hasBody : true,
        purpose : "El metodo PATCH es utilizado para aplicar modifcaciones parciales a un recurso"
    },
    {
        method : 'HEAD',
        hasBody : false,
        purpose : "El metodo HEAD pide una respuesta identica a la de una peticion GET pero sin el cuerpo de la respuesta"
    },
    {
        method : 'GET',
        hasBody : false,
        purpose : "El metodo get solicta una representacion de un recurso especifico, las peticiones que usan el metodo GET solo deben recuperar datos"
    },
    {
        method : 'DELETE',
        hasBody : false,
        purpose : "El metodo delete elimina el recurso especificado"
    }
    ];

    const requestMethod = methods.find(m => m.method === req.method) || {
            method : req.method,
            hasBody : false,
            purpose : "No hay una respuesta"
    };

    requestMethod.purpose+=requestMethod.hasBody ? "Tiene cuerpo" : "No tiene cuerpo";

    if(requestMethod.hasBody){
        req.body; //JS debe de parsear mediante un JSON el objeto necesario
        res.json({...req.body, ruta_consumida:req.route.path, ...requestMethod});
    } else {
        res.json({ruta_consumida : req.originalUrl, ...requestMethod});
    }


};

module.exports = mirrow;