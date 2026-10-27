const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Other'];

// Checks one expense body. Returns { ok, errors, clean }.
function checkSpend(body) {
  const src = body && typeof body === 'object' ? body : {};
  const errors = {};

  const title = typeof src.title === 'string' ? src.title.trim() : '';
  if (!title) errors.title = 'Title is required';
  else if (title.length > 100) errors.title = 'Title must be 100 characters or less';

  let amount = src.amount;
  if (typeof amount === 'string' && amount.trim() !== '') amount = Number(amount);
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    errors.amount = 'Amount must be a number';
  } else if (amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  } else if (amount > 1000000000) {
    errors.amount = 'Amount is too large';
  } else {
    amount = Math.round(amount * 100) / 100;
  }

  const category = src.category;
  if (!CATEGORIES.includes(category)) {
    errors.category = `Category must be one of: ${CATEGORIES.join(', ')}`;
  }

  let date = null;
  if (typeof src.date === 'string' && /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(src.date)) {
    const day = src.date.slice(0, 10);
    const parsed = new Date(`${day}T00:00:00.000Z`);
    if (!Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === day) {
      date = parsed;
    }
  }
  if (!date) errors.date = 'Date is required (YYYY-MM-DD)';

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    clean: { title, amount, category, date },
  };
}

module.exports = { CATEGORIES, checkSpend };
