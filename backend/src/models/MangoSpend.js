const mongoose = require('mongoose');
const { CATEGORIES } = require('../tools/checkSpend');

const mangoSpendSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    amount: { type: Number, required: true, min: 0.01 },
    category: { type: String, required: true, enum: CATEGORIES },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

// Model name is MangoSpend. Collection name is "expenses".
module.exports = mongoose.model('MangoSpend', mangoSpendSchema, 'expenses');
