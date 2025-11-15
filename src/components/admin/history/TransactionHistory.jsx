import React from "react";

const TransactionHistory = () => {
  return (
    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

      <div className="grid grid-cols-5 text-white/60 mb-3 pb-2 border-b border-white/10">
        <p>TrxID</p><p>Date</p><p>Category</p><p>Status</p><p>Amount</p>
      </div>

      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="grid grid-cols-5 py-3 border-b border-white/10 text-white"
        >
          <p>SGF854564</p>
          <p>Jan 24, 2025</p>
          <p>Subscription</p>
          <p className="text-green-400">Success</p>
          <p>$750.00</p>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
