const { sequelize } = require('../config/mysql');
const { Torneo } = require('../models');

/** 
*   Obtener lista BD
* @param {*} req
* @param {*} res
*/

/* const getItems = async (req,res)  => {
    const response = await sequelize.query('SELECT to.id, to.nombre, de.nombre_publico, ar.nombre, '
    +'em.nombre_publico FROM torneos to '
    +'INNER JOIN deportes de ON to.deporte_id = de.id '
    +'INNER JOIN arbitros ar ON to.arbitro_id = ar.id '
    +'INNER JOIN emparejamientos em ON to.instancia_id = em.id');
    res.status(200).json(response.rows);
} */

const getItems = async (req, res) => {

    try {
        const query = `SELECT t.id AS id, t.nombre AS nombre, de.nombre_publico AS deporte, CONCAT(ar.nombre, ' ', ar.apellido) AS arbitro, 
        em.nombre_publico AS instancia, t.sede_id, t.activo AS activo
        FROM torneos AS t 
        INNER JOIN deportes AS de ON t.deporte_id = de.id 
        INNER JOIN arbitros AS ar ON t.arbitro_id = ar.id 
        INNER JOIN emparejamientos AS em ON t.instancia_id = em.id`;
        //const query = 'SELECT * FROM torneos'
        const torneos = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

        res.send({ torneos });
        console.log(torneos)
    } catch (error) {
        res.status(500).send({ error });
    }
    /*     const torneos = await Torneo.findAll({});
    
        res.send({ torneos }); */

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