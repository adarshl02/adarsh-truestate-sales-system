import pool from "../utils/db.js";

export const fetchSales = async (options) => {
  const {
    page = 1,
    search,
    regions,
    genders,
    categories,
    tags,
    paymentMethods,
    minAge,
    maxAge,
    startDate,
    endDate,
    sortBy,
    sortOrder,
  } = options;

  const pageSize = 10; // fixed as per assignment
  const whereClauses = [];
  const values = [];

  // Helper to add IN filters (multi-select)
  const addInFilter = (column, items) => {
    if (!items || !items.length) return;

    const placeholders = items.map((_, i) => `$${values.length + i + 1}`);
    whereClauses.push(`${column} IN (${placeholders.join(", ")})`);
    values.push(...items);
  };

  // 🔍 Search on customer_name + phone_number (case-insensitive)
  if (search) {
    const idx = values.length + 1;
    whereClauses.push(
      `(LOWER(customer_name) LIKE $${idx} OR phone_number LIKE $${idx})`
    );
    values.push(`%${search.toLowerCase()}%`);
  }

  // 🎯 Multi-select filters
  addInFilter("customer_region", regions);
  addInFilter("gender", genders);
  addInFilter("product_category", categories);
  addInFilter("payment_method", paymentMethods);

  // 🏷 Tags (multi-select, match any tag using ILIKE)
  if (tags && tags.length) {
    const tagPlaceholders = tags.map((_, i) => `$${values.length + i + 1}`);
    const tagConditions = tagPlaceholders.map(
      (ph) => `tags ILIKE ${ph}`
    );
    whereClauses.push(`(${tagConditions.join(" OR ")})`);
    values.push(...tags.map((t) => `%${t}%`));
  }

  // Age range
  if (minAge) {
    const idx = values.length + 1;
    whereClauses.push(`age >= $${idx}`);
    values.push(Number(minAge));
  }

  if (maxAge) {
    const idx = values.length + 1;
    whereClauses.push(`age <= $${idx}`);
    values.push(Number(maxAge));
  }

  // Date range
  if (startDate) {
    const idx = values.length + 1;
    whereClauses.push(`date >= $${idx}`);
    values.push(startDate);
  }

  if (endDate) {
    const idx = values.length + 1;
    whereClauses.push(`date <= $${idx}`);
    values.push(endDate);
  }

  // WHERE clause
  const whereSQL = whereClauses.length
    ? "WHERE " + whereClauses.join(" AND ")
    : "";

  // 🔃 Sorting
  let orderBy = "ORDER BY date DESC"; // default: newest first

  if (sortBy === "quantity") {
    const dir = sortOrder === "asc" ? "ASC" : "DESC";
    orderBy = `ORDER BY quantity ${dir}`;
  } else if (sortBy === "customer_name") {
    // typically A–Z
    orderBy = "ORDER BY customer_name ASC";
  } else if (sortBy === "date") {
    const dir = sortOrder === "asc" ? "ASC" : "DESC";
    orderBy = `ORDER BY date ${dir}`;
  }

  // 📄 Pagination
  const pageNumber = Number(page) || 1;
  const limit = pageSize;
  const offset = (pageNumber - 1) * pageSize;

  // 1) Count total rows (for pagination info)
  const countQuery = `
    SELECT COUNT(*) AS total
    FROM sales_transactions
    ${whereSQL}
  `;

  const countResult = await pool.query(countQuery, values);
  const totalItems = Number(countResult.rows[0].total);
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // 2) Fetch actual page data
  const dataQuery = `
    SELECT *
    FROM sales_transactions
    ${whereSQL}
    ${orderBy}
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const dataValues = [...values, limit, offset];
  const dataResult = await pool.query(dataQuery, dataValues);

  return {
    data: dataResult.rows,
    pagination: {
      page: pageNumber,
      pageSize,
      totalItems,
      totalPages,
    },
  };
};
