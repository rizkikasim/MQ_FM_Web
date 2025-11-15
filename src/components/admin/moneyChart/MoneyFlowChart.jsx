import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Feb", saving: 95, expense: 40 },
  { name: "Mar", saving: 110, expense: 70 },
  { name: "Apr", saving: 105, expense: 45 },
  { name: "May", saving: 115, expense: 55 },
  { name: "Jun", saving: 120, expense: 90 },
  { name: "Jul", saving: 100, expense: 60 },
  { name: "Aug", saving: 110, expense: 80 },
  { name: "Sep", saving: 115, expense: 75 },
  { name: "Oct", saving: 90, expense: 40 },
  { name: "Nov", saving: 100, expense: 60 },
];

const MoneyFlowChart = () => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl mt-10">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Money Flow</h2>

        <select className="bg-white/10 px-3 py-2 rounded-xl text-white text-sm">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>

      <div className="w-full h-80 mt-6">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#ffffff15" vertical={false} />

            <XAxis
              dataKey="name"
              stroke="#ccc"
              tick={{ fill: "#ccc" }}
              tickLine={false}
            />
            <YAxis
              stroke="#ccc"
              tick={{ fill: "#ccc" }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#000",
                borderRadius: "12px",
                border: "1px solid #333",
                color: "#fff",
                padding: "10px 14px",
              }}
              labelStyle={{ color: "#aaa" }}
            />

            <Line
              type="monotone"
              dataKey="saving"
              stroke="#ffffff"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ffb56b"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default MoneyFlowChart;
