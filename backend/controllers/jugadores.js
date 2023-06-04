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

    const { body } = req;

    const jugador = await Jugador.create(body);
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
        {
            dni: body.dni,
            nombre: body.nombre,
            apellido: body.apellido,
            fecha_nac: body.fecha_nac,
            equipo_id: body.equipo_id,
        },
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