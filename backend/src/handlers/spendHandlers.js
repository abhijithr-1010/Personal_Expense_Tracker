const MangoSpend = require('../models/MangoSpend');
const { checkSpend } = require('../tools/checkSpend');

const OBJECT_ID = /^[a-f\d]{24}$/i;

const notFound = (res) => res.status(404).json({ message: 'Expense not found' });
const badData = (res, errors) =>
  res.status(400).json({ message: 'Invalid expense data', errors });
const serverFail = (res, err) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
};

async function listAll(req, res) {
  try {
    const rows = await MangoSpend.find().sort({ date: -1, createdAt: -1 });
    res.status(200).json(rows);
  } catch (err) {
    serverFail(res, err);
  }
}

async function getOne(req, res) {
  try {
    if (!OBJECT_ID.test(req.params.id)) return notFound(res);
    const row = await MangoSpend.findById(req.params.id);
    if (!row) return notFound(res);
    res.status(200).json(row);
  } catch (err) {
    serverFail(res, err);
  }
}

async function addOne(req, res) {
  try {
    const { ok, errors, clean } = checkSpend(req.body);
    if (!ok) return badData(res, errors);
    const row = await MangoSpend.create(clean);
    res.status(201).json(row);
  } catch (err) {
    serverFail(res, err);
  }
}

async function changeOne(req, res) {
  try {
    if (!OBJECT_ID.test(req.params.id)) return notFound(res);
    const { ok, errors, clean } = checkSpend(req.body);
    if (!ok) return badData(res, errors);
    const row = await MangoSpend.findByIdAndUpdate(req.params.id, clean, {
      new: true,
      runValidators: true,
    });
    if (!row) return notFound(res);
    res.status(200).json(row);
  } catch (err) {
    serverFail(res, err);
  }
}

async function removeOne(req, res) {
  try {
    if (!OBJECT_ID.test(req.params.id)) return notFound(res);
    const row = await MangoSpend.findByIdAndDelete(req.params.id);
    if (!row) return notFound(res);
    res.status(200).json({ message: 'Expense deleted', id: req.params.id });
  } catch (err) {
    serverFail(res, err);
  }
}

module.exports = { listAll, getOne, addOne, changeOne, removeOne };
