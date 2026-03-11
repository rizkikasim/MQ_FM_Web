import { memo, createContext, useContext } from "react";
import { Loader } from "lucide-react";

const Ctx = createContext({ colCount: 0 });
const useColCount = () => useContext(Ctx).colCount;

const Root = memo(({ children, colCount = 1, className = "" }) => (
  <Ctx.Provider value={{ colCount }}>
    <div className={`bg-white/5 rounded-xl border border-white/10 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">{children}</table>
      </div>
    </div>
  </Ctx.Provider>
));

const Head = memo(({ children }) => (
  <thead className="bg-white/10 text-white/70 uppercase text-xs tracking-wider">
    <tr>{children}</tr>
  </thead>
));

const Th = memo(({ children, className = "" }) => (
  <th className={`p-4 ${className}`}>{children}</th>
));

const Body = memo(({ children }) => (
  <tbody className="divide-y divide-white/10">{children}</tbody>
));

const Row = memo(({ children, className = "" }) => (
  <tr className={`hover:bg-white/5 transition ${className}`}>{children}</tr>
));

const Td = memo(({ children, className = "" }) => (
  <td className={`p-4 ${className}`}>{children}</td>
));

const Empty = memo(({ children = "No data found." }) => (
  <tr>
    <td colSpan={useColCount()} className="p-8 text-center text-white/50">
      {children}
    </td>
  </tr>
));

const Loading = memo(({ children = "Loading..." }) => (
  <tr>
    <td colSpan={useColCount()} className="p-8 text-center text-white/50">
      <div className="flex justify-center items-center gap-2">
        <Loader className="animate-spin" size={20} />
        {children}
      </div>
    </td>
  </tr>
));

const DataTable = Object.assign(Root, { Head, Th, Body, Row, Td, Empty, Loading });

export default DataTable;
