const express = require('express');
const {
  listAll,
  getOne,
  addOne,
  changeOne,
  removeOne,
} = require('../handlers/spendHandlers');

const router = express.Router();

router.get('/', listAll);
router.get('/:id', getOne);
router.post('/', addOne);
router.put('/:id', changeOne);
router.delete('/:id', removeOne);

module.exports = router;
