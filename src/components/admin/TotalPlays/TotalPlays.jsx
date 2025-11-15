// \\wsl.localhost\Ubuntu-22.04\home\lif\Projects\mqfe\mqfm-web\src\components\admin\TotalPlays\TotalPlays.jsx
// Sesuai permintaan Anda, file ini berisi SEMUA komponen dari UI dasbor light-mode.

import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  CheckCheck, 
  TrendingUp, 
  Eye, 
  Edit2, 
  Trash2,
  MoreVertical,
  Circle,
} from 'lucide-react';

// === 1. Komponen Stat Card (Reusable) ===
const StatCard = ({ title, value, percentage, icon, iconBgColor, trend }) => {
  const trendClass = trend === 'up' ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        <div className="flex items-center mt-2 text-xs">
          <span className={`flex items-center ${trendClass} mr-2`}>
            <TrendingUp size={14} className="mr-1" />
            {percentage}
          </span>
          <span className="text-gray-400">This month</span>
        </div>
      </div>
      <div className={`p-4 rounded-full ${iconBgColor}`}>
        {icon}
      </div>
    </div>
  );
};

// === 2. Komponen Sales Overview (Bar Chart) ===
const SalesOverviewChart = () => {
  const chartData = [
    { month: 'Jan', profit: 500, sales: 400 },
    { month: 'Feb', profit: 700, sales: 420 },
    { month: 'Mar', profit: 400, sales: 480 },
    { month: 'Apr', profit: 300, sales: 450 },
    { month: 'May', profit: 900, sales: 700 },
    { month: 'Jun', profit: 450, sales: 400 },
    { month: 'Jul', profit: 600, sales: 380 },
    { month: 'Aug', profit: 300, sales: 350 },
    { month: 'Sep', profit: 700, sales: 400 },
    { month: 'Oct', profit: 800, sales: 450 },
    { month: 'Nov', profit: 500, sales: 300 },
    { month: 'Dec', profit: 450, sales: 350 },
  ];

  const maxVal = 1200; // Sesuai sumbu Y

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Sales Overview</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-gray-500">Profit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400"></div>
            <span className="text-gray-500">Sales</span>
          </div>
        </div>
      </div>
      
      {/* Chart Mockup */}
      <div className="flex h-64 w-full items-end gap-3 sm:gap-4 pr-4">
        {/* Sumbu Y */}
        <div className="h-full flex flex-col justify-between text-xs text-gray-400 pb-8 -mt-2">
          <span>1.200</span>
          <span>800</span>
          <span>400</span>
          <span>0</span>
        </div>
        
        {/* Bars */}
        <div className="flex-1 h-full flex justify-around items-end border-l border-b border-gray-200 pl-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center h-full relative group">
              {/* Tooltip (muncul di May) */}
              {data.month === 'May' && (
                <div className="absolute -top-16 bg-gray-800 text-white p-2 rounded-md shadow-lg z-10">
                  <p className="text-sm font-bold">$52,657.00</p>
                  <p className="text-xs text-gray-300">Net Profit</p>
                  <div className="w-3 h-3 bg-gray-800 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
              )}
              {/* Bar Group */}
              <div className="flex items-end h-full gap-1.5">
                <div 
                  className="w-3 sm:w-4 bg-indigo-500 rounded-t-sm" 
                  style={{ height: `${(data.profit / maxVal) * 100}%` }}
                ></div>
                <div 
                  className="w-3 sm:w-4 bg-orange-400 rounded-t-sm" 
                  style={{ height: `${(data.sales / maxVal) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// === 3. Komponen Sales Reports (Donut Chart) ===
const SalesReportsChart = () => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  // Persentase untuk 3 bagian
  const p1_finished = 65; // Oranye
  const p2_progress = 25; // Biru
  // p3_not_started = 10; // Abu-abu

  const offset_p1 = 0;
  const offset_p2 = (p1_finished / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Sales Reports</h3>
        <select className="text-sm text-gray-500 border-none bg-transparent">
          <option>This Year</option>
          <option>This Month</option>
        </select>
      </div>

      {/* Donut Chart Mockup */}
      <div className="relative flex justify-center items-center h-52">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 140 140">
          <circle
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="70"
            cy="70"
          />
          <circle
            className="text-orange-500"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="70"
            cy="70"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (p1_finished / 100) * circumference}
          />
          <circle
            className="text-blue-500"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            r={radius}
            cx="70"
            cy="70"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (p2_progress / 100) * circumference - offset_p2}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-gray-800">$75.5k</span>
          <span className="text-xs text-green-500 flex items-center">
            <TrendingUp size={14} /> +$150 today
          </span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <Circle size={10} className="text-blue-500" fill="currentColor" />
          <span className="text-gray-500">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle size={10} className="text-orange-500" fill="currentColor" />
          <span className="text-gray-500">Finished</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle size={10} className="text-gray-200" fill="currentColor" />
          <span className="text-gray-500">Not Started</span>
        </div>
      </div>
    </div>
  );
};

// === 4. Komponen Recent Orders Table ===
const RecentOrdersTable = () => {
  const orders = [
    { no: '01', id: '#512743', date: '06 Dec 2023', product: 'Ipad 64GB Black', customer: 'Jenny Wilson', total: '$1600', status: 'Pending' },
    { no: '02', id: '#374255', date: '06 Dec 2023', product: 'iPhone 15 Pro Max 128GB Black', customer: 'Wade Warren', total: '$2299', status: 'Processing' },
    { no: '03', id: '#975101', date: '06 Dec 2023', product: 'Macbook Pro M1 Pro', customer: 'Cameron Williamson', total: '$3199', status: 'Shipped' },
    { no: '04', id: '#358424', date: '06 Dec 2023', product: 'Asus Laptop', customer: 'Robert Fox', total: '$999', status: 'Delivered' },
    { no: '05', id: '#975201', date: '06 Dec 2023', product: 'Apple Watch Series 9', customer: 'Robert Fox', total: '$1600', status: 'Shipped' },
    { no: '06', id: '#576196', date: '06 Dec 2023', product: 'Apple Pencil 2', customer: 'Robert Fox', total: '$99', status: 'Delivered' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        <a href="#" className="text-sm text-indigo-600 font-medium">See All</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase border-b border-gray-200">
              <th className="py-3 px-4">No</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Order Date</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Customers</th>
              <th className="py-3 px-4">Total Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-sm text-gray-700 border-b border-gray-100">
                <td className="py-4 px-4">{order.no}</td>
                <td className="py-4 px-4 font-medium text-gray-800">{order.id}</td>
                <td className="py-4 px-4">{order.date}</td>
                <td className="py-4 px-4 font-medium text-gray-800">{order.product}</td>
                <td className="py-4 px-4 flex items-center gap-2">
                  <img src={`https://ui-avatars.com/api/?name=${order.customer.replace(' ', '+')}&background=random&color=fff`} alt={order.customer} className="w-8 h-8 rounded-full" />
                  <span>{order.customer}</span>
                </td>
                <td className="py-4 px-4 font-medium text-gray-800">{order.total}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                    Order {order.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-3">
                    <button className="text-gray-400 hover:text-indigo-600"><Edit2 size={16} /></button>
                    <button className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// === 5. Komponen Utama (Default Export) ===
// Ini adalah komponen yang akan di-export oleh file ini.
// Komponen ini merakit SEMUA widget di atas menjadi tata letak dasbor.
const FullDashboardLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 font-sans">
      
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="New Customer" 
          value="68" 
          percentage="10%" 
          icon={<Users size={20} className="text-orange-600" />}
          iconBgColor="bg-orange-100"
          trend="up"
        />
        <StatCard 
          title="Running Orders" 
          value="501" 
          percentage="10%" 
          icon={<ShoppingBag size={20} className="text-pink-600" />}
          iconBgColor="bg-pink-100"
          trend="up"
        />
        <StatCard 
          title="Total Profit" 
          value="$8.546" 
          percentage="10%" 
          icon={<DollarSign size={20} className="text-indigo-600" />}
          iconBgColor="bg-indigo-100"
          trend="up"
        />
        <StatCard 
          title="Order Completed" 
          value="1,400" 
          percentage="10%" 
          icon={<CheckCheck size={20} className="text-green-600" />}
          iconBgColor="bg-green-100"
          trend="up"
        />
      </div>

      {/* Main Content Grid (Charts & Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <SalesOverviewChart />
        </div>
        <div className="lg:col-span-1">
          <SalesReportsChart />
        </div>
        <div className="lg:col-span-3">
          <RecentOrdersTable />
        </div>
      </div>

    </div>
  );
};

// Ekspor komponen `FullDashboardLayout` sebagai `TotalPlays`
// agar sesuai dengan nama file Anda.
const TotalPlays = () => {
  return <FullDashboardLayout />;
};

export default TotalPlays;