import { Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCard from '../components/StatsCard';
import DealsTable from '../components/DealsTable';

const salesData = [
  { name: '5k', value: 20 },
  { name: '10k', value: 45 },
  { name: '15k', value: 30 },
  { name: '20k', value: 50 },
  { name: '25k', value: 100 },
  { name: '30k', value: 45 },
  { name: '35k', value: 55 },
  { name: '40k', value: 30 },
  { name: '45k', value: 65 },
  { name: '50k', value: 50 },
  { name: '55k', value: 45 },
  { name: '60k', value: 50 },
  
  { name: '5k', value: 20 },
  { name: '10k', value: 45 },
  { name: '15k', value: 30 },
  { name: '20k', value: 50 },
  { name: '25k', value: 100 },
  { name: '30k', value: 45 },
  { name: '35k', value: 55 },
  { name: '40k', value: 30 },
  { name: '45k', value: 65 },
  { name: '50k', value: 50 },
  { name: '55k', value: 45 },
  { name: '60k', value: 50 },
];

function Dashboard() {
  return (
    <div className="p-8 bg-[#F5F6FA]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <img
              src="/api/placeholder/32/32"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">Moni Roy</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total User"
          value="40,689"
          change="+8.5% Up from yesterday"
          type="users"
        />
        <StatsCard
          title="Total Order"
          value="10293"
          change="+1.3% Up from past week"
          type="orders"
        />
        <StatsCard
          title="Total Sales"
          value="$89,000"
          change="-4.3% Down from yesterday"
          type="sales"
          isNegative
        />
        <StatsCard
          title="Total Pending"
          value="2040"
          change="+1.8% Up from yesterday"
          type="pending"
        />
      </div>

      <div className="bg-white rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Sales Details</h2>
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>October</option>
          </select>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00CC96"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DealsTable />
    </div>
  );
}

export default Dashboard;