const { Arbitro } = require('../models');

/** 
*   Obtener lista BD
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {

    const arbitros = await Arbitro.findAll({});

    res.send({ arbitros });

}

/** 
*   Obtener detalle BD
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {

    const { id } = req.params;

    const arbitro = await Arbitro.findByPk(id);

    if (!arbitro) {
        return res.send({ error: "No existe ese arbitro" });
    }

    res.send({ arbitro });

}


/** 
*   Insertar registro BD
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {

    const { body } = req;

    const arbitro = await Arbitro.create(body);
    res.send({ arbitro })

}


/** 
*   Actualizar registro BD
* @param {*} req
* @param {*} res
*/
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const arbitro = await Arbitro.findByPk(id)

    await arbitro.update(
        {
            dni: body.dni,
            nombre: body.nombre,
            apellido: body.apellido,
        },
        { where: { id: id } }
    );

    if (!arbitro) {
        return res.send({ error: "No existe ese arbitro" });
    }

    res.send({ arbitro });

}


/** 
*   Eliminar registro BD
* @param {*} req
* @param {*} res
*/
const deleteItem = async (req, res) => {
    const { id } = req.params;

    const arbitro = await Arbitro.findByPk(id)

    await arbitro.update(
        { activo: 0, disponible: 0 },
        { where: { id: id } }
    );

    if (!arbitro) {
        return res.send({ error: "No existe ese arbitro" });
    }

    res.send({ arbitro });

}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }