import React from "react";

export default function Filters({
  search,
  setSearch,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  regions,
  setRegions,
  genders,
  setGenders,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  resetFilters,
  toggleValue,
}) {
  return (
    <>
      {/* Search + Sort row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by customer name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            disabled={sortBy === "customer_name"}
            className="px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      {/* Main layout: filters */}
      <div className="grid gap-6 md:grid-cols-[260px,1fr]">
        <aside className="p-4 space-y-4 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-100">Filters</h2>
            <button onClick={resetFilters} className="text-xs text-emerald-400 hover:underline">Reset</button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-400">Region</p>
            <div className="flex flex-wrap gap-2">
              {["North", "South", "East", "West"].map((region) => (
                <button
                  key={region}
                  onClick={() => toggleValue(region, setRegions, regions)}
                  className={`px-2 py-1 text-xs rounded-full border ${regions.includes(region) ? "bg-emerald-500/20 border-emerald-400 text-emerald-300" : "bg-slate-950 border-slate-700 text-slate-300"}`}
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
                  className={`px-2 py-1 text-xs rounded-full border ${genders.includes(g) ? "bg-emerald-500/20 border-emerald-400 text-emerald-300" : "bg-slate-950 border-slate-700 text-slate-300"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-400">Age Range</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="w-1/2 px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                className="w-1/2 px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-400">Date Range</p>
            <div className="flex flex-col gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg"
              />
            </div>
          </div>
        </aside>

        <div />
      </div>
    </>
  );
}
