import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000"; // later change to your deployed backend

function App() {
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // search + filters + sorting state
  const [search, setSearch] = useState("");
  const [regions, setRegions] = useState([]); // multi-select
  const [genders, setGenders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // helper to build query string
  const buildQuery = () => {
    const params = new URLSearchParams();
    params.set("page", page);
    if (search) params.set("search", search);
    if (regions.length) params.set("regions", regions.join(","));
    if (genders.length) params.set("genders", genders.join(","));
    if (categories.length) params.set("categories", categories.join(","));
    if (tags.length) params.set("tags", tags.join(","));
    if (paymentMethods.length)
      params.set("paymentMethods", paymentMethods.join(","));
    if (minAge) params.set("minAge", minAge);
    if (maxAge) params.set("maxAge", maxAge);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    return params.toString();
  };

  // fetch data whenever filters/sort/page change
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const qs = buildQuery();
        const res = await fetch(`${API_BASE_URL}/api/sales?${qs}`);
        const data = await res.json();
        setSales(data.data || []);
        setPagination(data.pagination || { page: 1, totalPages: 1, totalItems: 0 });
      } catch (err) {
        console.error("Error fetching sales:", err);
      }
    };
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, regions, genders, categories, tags, paymentMethods, minAge, maxAge, startDate, endDate, sortBy, sortOrder]);

  const resetFilters = () => {
    setRegions([]);
    setGenders([]);
    setCategories([]);
    setTags([]);
    setPaymentMethods([]);
    setMinAge("");
    setMaxAge("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  // simple toggle for multi-select filters (for now just dummy options)
  const toggleValue = (value, listSetter, list) => {
    if (list.includes(value)) {
      listSetter(list.filter((v) => v !== value));
    } else {
      listSetter([...list, value]);
    }
    setPage(1);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-semibold text-slate-50">
            Retail Sales Management
          </h1>
          <p className="text-sm text-slate-400">
            Search, filter, sort and analyze sales transactions.
          </p>
        </header>

        {/* Search + Sort row */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by customer name or phone..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Sort dropdowns */}
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg"
            >
              <option value="date">Date (Newest)</option>
              <option value="quantity">Quantity</option>
              <option value="customer_name">Customer Name (A–Z)</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              disabled={sortBy === "customer_name"} // always A–Z
              className="px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg"
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
        </div>

        {/* Main layout: filters + table */}
        <div className="grid gap-6 md:grid-cols-[260px,1fr]">
          {/* Filter panel */}
          <aside className="p-4 space-y-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-100">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-xs text-emerald-400 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Example filters – you can replace options with real distinct values later */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400">Region</p>
              <div className="flex flex-wrap gap-2">
                {["North", "South", "East", "West"].map((region) => (
                  <button
                    key={region}
                    onClick={() => toggleValue(region, setRegions, regions)}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      regions.includes(region)
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                        : "bg-slate-950 border-slate-700 text-slate-300"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400">Gender</p>
              <div className="flex flex-wrap gap-2">
                {["Male", "Female"].map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleValue(g, setGenders, genders)}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      genders.includes(g)
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                        : "bg-slate-950 border-slate-700 text-slate-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Age range */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400">Age Range</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minAge}
                  onChange={(e) => {
                    setMinAge(e.target.value);
                    setPage(1);
                  }}
                  className="w-1/2 px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxAge}
                  onChange={(e) => {
                    setMaxAge(e.target.value);
                    setPage(1);
                  }}
                  className="w-1/2 px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg"
                />
              </div>
            </div>

            {/* Date range */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-400">Date Range</p>
              <div className="flex flex-col gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setPage(1);
                  }}
                  className="px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setPage(1);
                  }}
                  className="px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg"
                />
              </div>
            </div>

            {/* You can add similar sections for Categories, Tags, Payment Methods */}
          </aside>

          {/* Table area */}
          <section className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            {/* Top info row */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-400">
                Page {pagination.page} of {pagination.totalPages} •{" "}
                {pagination.totalItems} records
              </p>
            </div>

            {/* Table */}
            <div className="overflow-auto border border-slate-800 rounded-lg">
              <table className="min-w-full text-xs">
                <thead className="bg-slate-800/80">
                  <tr className="text-left">
                    <th className="px-3 py-2 font-medium">Date</th>
                    <th className="px-3 py-2 font-medium">Customer</th>
                    <th className="px-3 py-2 font-medium">Region</th>
                    <th className="px-3 py-2 font-medium">Product</th>
                    <th className="px-3 py-2 font-medium">Qty</th>
                    <th className="px-3 py-2 font-medium">Final Amount</th>
                    <th className="px-3 py-2 font-medium">Payment</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-3 py-6 text-center text-slate-400"
                      >
                        No results found. Try adjusting filters or search.
                      </td>
                    </tr>
                  ) : (
                    sales.map((row) => (
                      <tr
                        key={row.transaction_id}
                        className="border-t border-slate-800 hover:bg-slate-800/40"
                      >
                        <td className="px-3 py-2">
                          {row.date?.slice(0, 10)}
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium">
                            {row.customer_name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {row.phone_number}
                          </div>
                        </td>
                        <td className="px-3 py-2">{row.customer_region}</td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-[11px]">
                            {row.product_name}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {row.product_category}
                          </div>
                        </td>
                        <td className="px-3 py-2">{row.quantity}</td>
                        <td className="px-3 py-2">
                          ₹{Number(row.final_amount).toFixed(2)}
                        </td>
                        <td className="px-3 py-2">{row.payment_method}</td>
                        <td className="px-3 py-2">{row.order_status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-4">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 text-xs border rounded-lg disabled:opacity-40 border-slate-700 bg-slate-950"
              >
                Previous
              </button>
              <span className="text-xs text-slate-400">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 text-xs border rounded-lg disabled:opacity-40 border-slate-700 bg-slate-950"
              >
                Next
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
