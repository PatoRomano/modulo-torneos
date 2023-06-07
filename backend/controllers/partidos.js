const { Partido } = require('../models');

/** 
*   Obtener lista BD
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {

    const partidos = await Partido.findAll({});

    res.send({ partidos });

}

/** 
*   Obtener detalle BD
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {

    const { id } = req.params;

    const partido = await Partido.findByPk(id);

    if (!partido) {
        return res.send({ error: "No existe ese partido" });
    }

    res.send({ partido });

}


/** 
*   Insertar registro BD
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {

    // Verificar si ya existe el dni para todos los casos con DNI

    const { body } = req;

    const partido = await Partido.create(body);
    res.send({ partido })

}


/** 
*   Actualizar registro BD
* @param {*} req
* @param {*} res
*/
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const partido = await Partido.findByPk(id)

    await partido.update(
        body,
        { where: { id: id } },
    );

    if (!partido) {
        return res.send({ error: "No existe ese partido" });
    }

    res.send({ partido });

}



const changeStateItem = async (req, res, active) => {
    const { id } = req.params;

    const partido = await Partido.findByPk(id)

    if (!partido) {
        return res.send({ error: "No existe ese partido" });
    }

    await partido.update(
        { activo: active },
        { where: { id: id } }
    );

    res.send({ partido });

}

const deleteItem = async (req, res) => {
    await changeStateItem(req, res, 0);
}

const activateItem = async (req, res) => {
    await changeStateItem(req, res, 1);
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, activateItem }