const { sequelize } = require('../config/mysql');
const { Partido } = require('../models');

/** 
*   Obtener lista BD
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {

    try {
        const query = `SELECT p.id AS id, t.nombre AS torneo, eq1.nombre AS equipoUno, eq2.nombre AS equipoDos, 
        em.nombre_publico AS instancia, p.goles_equipo_uno AS goles_equipo_uno, p.goles_equipo_dos AS goles_equipo_dos, 
        p.fecha AS fecha, p.activo AS activo
        FROM partidos AS p 
        INNER JOIN torneos AS t ON p.torneo_id = t.id 
        INNER JOIN equipos AS eq1 ON p.equipo_uno_id = eq1.id
        INNER JOIN equipos AS eq2 ON p.equipo_dos_id = eq2.id
        INNER JOIN emparejamientos AS em ON p.llave_id = em.id
        ORDER BY p.llave_id ASC`;
        //const query = 'SELECT * FROM torneos'
        const partidos = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        res.send({ partidos });
        console.log(partidos)
    } catch (error) {
        res.status(500).send({ error });
    }

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