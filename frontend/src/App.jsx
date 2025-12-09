import { useEffect, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import SalesTable from "./components/SalesTable";
import { fetchSales } from "./api/salesApi";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function App() {
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, totalItems: 0 });

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

  useEffect(() => {
    const load = async () => {
      try {
        const params = { page, search, regions, genders, categories, tags, paymentMethods, minAge, maxAge, startDate, endDate, sortBy, sortOrder };
        const data = await fetchSales(API_BASE_URL, params);
        setSales(data.data || []);
        setPagination(data.pagination || { page: 1, totalPages: 1, totalItems: 0 });
      } catch (err) {
        console.error("Error fetching sales:", err);
      }
    };
    load();
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

  const toggleValue = (value, listSetter, list) => {
    if (list.includes(value)) listSetter(list.filter((v) => v !== value));
    else listSetter([...list, value]);
    setPage(1);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header />

        <Filters
          search={search}
          setSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          regions={regions}
          setRegions={setRegions}
          genders={genders}
          setGenders={setGenders}
          minAge={minAge}
          setMinAge={(v) => {
            setMinAge(v);
            setPage(1);
          }}
          maxAge={maxAge}
          setMaxAge={(v) => {
            setMaxAge(v);
            setPage(1);
          }}
          startDate={startDate}
          setStartDate={(v) => {
            setStartDate(v);
            setPage(1);
          }}
          endDate={endDate}
          setEndDate={(v) => {
            setEndDate(v);
            setPage(1);
          }}
          resetFilters={resetFilters}
          toggleValue={toggleValue}
        />

        <div className="grid gap-6 md:grid-cols-[260px,1fr]">
          <div />
          <SalesTable sales={sales} pagination={pagination} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default App;
