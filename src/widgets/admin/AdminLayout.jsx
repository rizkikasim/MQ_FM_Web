import { memo } from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = memo(({ children }) => (
  <div className="flex h-screen bg-[#111317] text-white overflow-hidden font-urbanist">
    <AdminSidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <main className="flex-1 overflow-y-auto p-4 md:p-6 text-gray-200">
        {children}
      </main>
    </div>
  </div>
));

export default AdminLayout;
