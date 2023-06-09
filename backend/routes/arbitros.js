const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem, activateItem, deactivateItem } = require("../controllers/arbitros");


router.get('/', getItems);

router.get('/:id', getItem);

router.post('/', createItem);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

router.put('/activate/:id', activateItem);

router.put('/deactivate/:id', deactivateItem);


module.exports = router