import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MetricCard = ({ title, value, change, icon }) => (
  <div className=" rounded-lg shadow p-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      {/* <div className={`p-2 rounded-full ${icon.bg}`}>
        {icon.component}
      </div> */}
    </div>
    <p className={`text-sm ${change.color}`}>
      {change.value} {change.text}
    </p>
  </div>
);

const Dashboard = () => {
  const salesData = [
    { name: '5k', value: 20 },
    { name: '20k', value: 50 },
    { name: '10k', value: 30 },
    { name: '7k', value: 7 },
    { name: '15k', value: 40 },
    

    // ... more data points
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total User"
          value="40,689"
          change={{ value: "8.5%", text: "Up from yesterday", color: "text-green-500" }}
        //   icon={{ bg: "bg-purple-100", component: <UserIcon className="text-purple-600" /> 
        //   }}
        />
        {/* Add other MetricCards here */}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Sales Details</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Deals Details</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Location</th>
              <th>Date - Time</th>
              <th>Piece</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Apple Watch</td>
              <td>6096 Marjolaine Landing</td>
              <td>12.09.2019 - 12:53 PM</td>
              <td>423</td>
              <td>$34,295</td>
              <td><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Delivered</span></td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;