import React from "react";

export default function SalesTable({ sales, pagination, page, setPage }) {
  return (
    <section className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-slate-400">
          Page {pagination.page} of {pagination.totalPages} • {pagination.totalItems} records
        </p>
      </div>

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
                <td colSpan="8" className="px-3 py-6 text-center text-slate-400">
                  No results found. Try adjusting filters or search.
                </td>
              </tr>
            ) : (
              sales.map((row) => (
                <tr key={row.transaction_id} className="border-t border-slate-800 hover:bg-slate-800/40">
                  <td className="px-3 py-2">{row.date?.slice(0, 10)}</td>
                  <td className="px-3 py-2">
                    <div className="font-medium">{row.customer_name}</div>
                    <div className="text-[10px] text-slate-400">{row.phone_number}</div>
                  </td>
                  <td className="px-3 py-2">{row.customer_region}</td>
                  <td className="px-3 py-2">
                    <div className="font-medium text-[11px]">{row.product_name}</div>
                    <div className="text-[10px] text-slate-400">{row.product_category}</div>
                  </td>
                  <td className="px-3 py-2">{row.quantity}</td>
                  <td className="px-3 py-2">₹{Number(row.final_amount).toFixed(2)}</td>
                  <td className="px-3 py-2">{row.payment_method}</td>
                  <td className="px-3 py-2">{row.order_status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 text-xs border rounded-lg disabled:opacity-40 border-slate-700 bg-slate-950"
        >
          Previous
        </button>
        <span className="text-xs text-slate-400">Page {pagination.page} of {pagination.totalPages}</span>
        <button
          disabled={page >= pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 text-xs border rounded-lg disabled:opacity-40 border-slate-700 bg-slate-950"
        >
          Next
        </button>
      </div>
    </section>
  );
}
