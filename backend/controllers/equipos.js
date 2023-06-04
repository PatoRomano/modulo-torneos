const { Equipo } = require('../models');

/** 
*   Obtener lista BD
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {

    const equipos = await Equipo.findAll({});

    res.send({ equipos });

}

/** 
*   Obtener detalle BD
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {

    const { id } = req.params;

    const equipo = await Equipo.findByPk(id);

    if (!equipo) {
        return res.send({ error: "No existe ese equipo" });
    }

    res.send({ equipo });

}


/** 
*   Insertar registro BD
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {

    const { body } = req;

    const equipo = await Equipo.create(body);
    res.send({ equipo })

}


/** 
*   Actualizar registro BD
* @param {*} req
* @param {*} res
*/
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const equipo = await Equipo.findByPk(id)

    await equipo.update(
        { nombre: body.nombre },
        { where: { id: id } }
    );

    if (!equipo) {
        return res.send({ error: "No existe ese equipo" });
    }

    res.send({ equipo });

}




const changeStateItem = async (req, res, active) => {
    const { id } = req.params;

    const equipo = await Equipo.findByPk(id)

    if (!equipo) {
        return res.send({ error: "No existe ese equipo" });
    }

    await equipo.update(
        { activo: active },
        { where: { id: id } }
    );

    res.send({ equipo });

}

const deleteItem = async (req, res) => {
    await changeStateItem(req, res, 0);
}

const activateItem = async (req, res) => {
    await changeStateItem(req, res, 1);
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem, activateItem }