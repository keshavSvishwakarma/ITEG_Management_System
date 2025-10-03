// utils/paginate.js
const mongoose = require('mongoose');

async function paginate(Model, reqQuery = {}, options = {}) {
  // options: { extraFilter, select, populate }
  const page = Math.max(1, parseInt(reqQuery.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(reqQuery.limit) || 10)); // cap limit at 100
  const sort = reqQuery.sort || '-createdAt';
  const skip = (page - 1) * limit;

  // Build filter
  const filter = { ...(options.extraFilter || {}) };
  if (reqQuery.status) filter.status = reqQuery.status;
  if (reqQuery.class) filter.class = reqQuery.class;
  if (reqQuery.search) {
    const s = reqQuery.search;
    filter.$or = [
      { name: { $regex: s, $options: 'i' } },
      { email: { $regex: s, $options: 'i' } }
    ];
  }

  const query = Model.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

  if (options.select) query.select(options.select);
  if (options.populate) query.populate(options.populate);

  const [data, total] = await Promise.all([
    query.exec(),
    Model.countDocuments(filter)
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      pages: Math.max(1, Math.ceil(total / limit))
    }
  };
}

module.exports = paginate;
