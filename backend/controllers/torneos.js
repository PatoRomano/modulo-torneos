const { Torneo } = require('../models');

/** 
*   Obtener lista BD
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {

    const torneos = await Torneo.findAll({});

    res.send({ torneos });

}



const getItem = async (req, res) => {

    const { id } = req.params;

    const torneo = await Torneo.findByPk(id);

    if (!torneo) {
        return res.send({ error: "No existe ese torneo" });
    }

    res.send({ torneo });

}




const createItem = async (req, res) => {

    // Verificar si ya existe el dni para todos los casos con DNI

    const { body } = req;

    const torneo = await Torneo.create(body);
    res.send({ torneo })

}






const updateItem = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const torneo = await Torneo.findByPk(id)

    await torneo.update(
        body,
        { where: { id: id } }
    );

    if (!torneo) {
        return res.send({ error: "No existe ese torneo" });
    }

    res.send({ torneo });

}



const changeStateItem = async (req, res, active) => {
    const { id } = req.params;

    const torneo = await Torneo.findByPk(id)

    if (!torneo) {
        return res.send({ error: "No existe ese torneo" });
    }

    await torneo.update(
        { activo: active },
        { where: { id: id } }
    );

    res.send({ torneo });

}

const deleteItem = async (req, res) => {
    await changeStateItem(req, res, 0);
}

const activateItem = async (req, res) => {
    await changeStateItem(req, res, 1);
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, activateItem }