// Helper to build query string and fetch sales from the backend
export function buildQuery(params = {}) {
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
  } = params;

  const p = new URLSearchParams();
  p.set("page", page);
  if (search) p.set("search", search);
  if (regions && regions.length) p.set("regions", regions.join(","));
  if (genders && genders.length) p.set("genders", genders.join(","));
  if (categories && categories.length) p.set("categories", categories.join(","));
  if (tags && tags.length) p.set("tags", tags.join(","));
  if (paymentMethods && paymentMethods.length)
    p.set("paymentMethods", paymentMethods.join(","));
  if (minAge) p.set("minAge", minAge);
  if (maxAge) p.set("maxAge", maxAge);
  if (startDate) p.set("startDate", startDate);
  if (endDate) p.set("endDate", endDate);
  if (sortBy) p.set("sortBy", sortBy);
  if (sortOrder) p.set("sortOrder", sortOrder);
  return p.toString();
}

export async function fetchSales(apiBaseUrl, params = {}) {
  const qs = buildQuery(params);
  const url = `${apiBaseUrl.replace(/\/$/, "")}/api/sales?${qs}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch failed: ${res.status} ${text}`);
  }
  return res.json();
}
