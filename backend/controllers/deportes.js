const { Deporte } = require('../models');

/** 
*   Obtener lista BD
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {

    const deportes = await Deporte.findAll({});

    res.send({ deportes });

}

/** 
*   Obtener detalle BD
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {

    const { id } = req.params;

    const deporte = await Deporte.findByPk(id);

    if (!deporte) {
        return res.send({ error: "No existe ese deporte" });
    }

    res.send({ deporte });

}


/** 
*   Insertar registro BD
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {

    const { body } = req;

    const deporte = await Deporte.create(body);
    res.send({ deporte })

}


/** 
*   Actualizar registro BD
* @param {*} req
* @param {*} res
*/
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const deporte = await Deporte.findByPk(id)

    await deporte.update(
        { nombre: body.nombre },
        { where: { id: id } }
    );

    if (!deporte) {
        return res.send({ error: "No existe ese deporte" });
    }

    res.send({ deporte });

}


/** 
*   Eliminar registro BD
* @param {*} req
* @param {*} res
*/
const deleteItem = async (req, res) => {
    const { id } = req.params;

    const deporte = await Deporte.findByPk(id)

    await deporte.update(
        { activo: 0 },
    );

    if (!deporte) {
        return res.send({ error: "No existe ese deporte" });
    }

    res.send({ deporte });

}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }