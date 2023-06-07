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

    const arbitro = await Arbitro.findAll({ 
        where: { dni: body.dni } 
    });

    if (arbitro) {
        return res.send({ error: "Ya existe un arbitro con ese DNI" })
    }

    arbitro = await Arbitro.create(body);
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
        body,
        { 
            where: { id: id }
        }
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
const changeStateItem = async (req, res, active, enabled) => {
    const { id } = req.params;

    const arbitro = await Arbitro.findByPk(id)

    if (!arbitro) {
        return res.send({ error: "No existe ese arbitro" });
    }

    if (active == 1 && enabled == 0 && arbitro.activo == 0) {
        return res.send({ error: "No se puede desactivar ese arbitro" });
    }

    await arbitro.update(
        { activo: active, disponible: enabled },
        { where: { id: id } }
    );

    res.send({ arbitro });

}

const deleteItem = async (req, res) => {
    await changeStateItem(req, res, 0, 0);
}

const activateItem = async (req, res) => {
    await changeStateItem(req, res, 1, 1);
}

const deactivateItem = async (req, res) => {
    await changeStateItem(req, res, 1, 0);
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, activateItem, deactivateItem }