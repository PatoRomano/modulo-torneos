const { Instancia } = require('../models');


const getItems = async (req, res) => {

    const instancias = await Instancia.findAll({ 
        attributes: ['id','nombre', 'nombre_publico'],
        where: { id_owner: 1 }
    });

    res.send({ instancias });

}


const getItem = async (req, res) => {

    const { id } = req.params;

    const instancia = await Instancia.findByPk(id);

    if (!instancia) {
        return res.send({ error: "No existe ese instancia" });
    }

    res.send({ instancia });

}



const createItem = async (req, res) => {

    const { body } = req;

    const instancia = await Instancia.create(body);
    res.send({ instancia })

}



const updateItem = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const instancia = await Instancia.findByPk(id)

    await instancia.update(
        {
            dni: body.dni,
            nombre: body.nombre,
            apellido: body.apellido,
        },
        { where: { id: id } }
    );

    if (!instancia) {
        return res.send({ error: "No existe ese instancia" });
    }

    res.send({ instancia });

}



const deleteItem = async (req, res) => {
    const { id } = req.params;

    const instancia = await Instancia.findByPk(id)

    await instancia.update(
        { activo: 0, disponible: 0 },
        { where: { id: id } }
    );

    if (!instancia) {
        return res.send({ error: "No existe ese instancia" });
    }

    res.send({ instancia });

}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }