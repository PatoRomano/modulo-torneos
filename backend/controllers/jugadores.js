const { Jugador } = require('../models');

/** 
*   Obtener lista BD
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {

    const jugadores = await Jugador.findAll({});

    res.send({ jugadores });

}

/** 
*   Obtener detalle BD
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {

    const { id } = req.params;

    const jugador = await Jugador.findByPk(id);

    if (!jugador) {
        return res.send({ error: "No existe ese jugador" });
    }

    res.send({ jugador });

}


/** 
*   Insertar registro BD
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {

    // Verificar si ya existe el dni para todos los casos con DNI

    const { body } = req;

    const jugador = await Jugador.findAll({ 
        where: { dni: body.dni } 
    });

    if (jugador) {
        return res.send({ error: "Ya existe un jugador con ese DNI" })
    }
    jugador = await Jugador.create(body);
    res.send({ jugador })

}


/** 
*   Actualizar registro BD
* @param {*} req
* @param {*} res
*/
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const jugador = await Jugador.findByPk(id)

    await jugador.update(
        body,
        { where: { id: id } }
    );

    if (!jugador) {
        return res.send({ error: "No existe ese jugador" });
    }

    res.send({ jugador });

}



const changeStateItem = async (req, res, active) => {
    const { id } = req.params;

    const jugador = await Jugador.findByPk(id)

    if (!jugador) {
        return res.send({ error: "No existe ese jugador" });
    }

    await jugador.update(
        { activo: active },
        { where: { id: id } }
    );

    res.send({ jugador });

}

const deleteItem = async (req, res) => {
    await changeStateItem(req, res, 0);
}

const activateItem = async (req, res) => {
    await changeStateItem(req, res, 1);
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, activateItem }