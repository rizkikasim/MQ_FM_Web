import React from "react";

const RightPanel = () => {
  return (
    <aside className="w-80 p-8 bg-white/5 backdrop-blur-2xl border-l border-white/10 space-y-10">

      <div className="bg-black/60 backdrop-blur-xl text-white rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-semibold">Formation Status</h3>
        <p className="text-white/60">In Progress</p>

        <div className="w-full h-2 bg-white/20 rounded-full mt-3">
          <div className="h-2 bg-white rounded-full w-1/2"></div>
        </div>

        <p className="text-white/60 mt-3">Estimated Processing</p>
        <p className="font-semibold">4–5 business days</p>

        <button className="mt-4 w-full bg-white text-black py-2 rounded-xl font-semibold">
          View All
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">To Do List</h3>
        <div className="text-white/80 space-y-3">
          <div className="flex justify-between"><p>Run Payroll</p><p>$120</p></div>
          <div className="flex justify-between"><p>Review time off request</p><p>$120</p></div>
          <div className="flex justify-between"><p>Finish onboarding Tony</p><p>$120</p></div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Upcoming Payment</h3>
        <div className="text-white/80 space-y-3">
          <div className="flex justify-between"><p>Home Rent</p><p>$200</p></div>
          <div className="flex justify-between"><p>Car Insurance</p><p>$600</p></div>
        </div>
      </div>

    </aside>
  );
};

export default RightPanel;
