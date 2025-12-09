import { fetchSales } from "../services/sales.service.js";

export const getSales = async (req, res) => {
  try {
    // Extract and normalize query params
    const {
      page,
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
    } = req.query;

    const parseList = (value) =>
      value ? value.split(",").map((v) => v.trim()).filter(Boolean) : [];

    const options = {
      page,
      search,
      regions: parseList(regions),
      genders: parseList(genders),
      categories: parseList(categories),
      tags: parseList(tags),
      paymentMethods: parseList(paymentMethods),
      minAge,
      maxAge,
      startDate,
      endDate,
      sortBy,
      sortOrder,
    };

    const result = await fetchSales(options);

    res.json(result);
  } catch (error) {
    console.error("Error in getSales:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

