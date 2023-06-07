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
        body,
        { where: { id: id } }
    );

    if (!deporte) {
        return res.send({ error: "No existe ese deporte" });
    }

    res.send({ deporte });

}



const changeStateItem = async (req, res, active) => {
    const { id } = req.params;

    const deporte = await Deporte.findByPk(id)

    if (!deporte) {
        return res.send({ error: "No existe ese deporte" });
    }

    await deporte.update(
        { activo: active },
        { where: { id: id } }
    );

    res.send({ deporte });

}

const deleteItem = async (req, res) => {
    await changeStateItem(req, res, 0);
}

const activateItem = async (req, res) => {
    await changeStateItem(req, res, 1);
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, activateItem }