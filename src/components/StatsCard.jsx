import { Users, Package, TrendingUp, Clock } from 'lucide-react';

const iconMap = {
  users: Users,
  orders: Package,
  sales: TrendingUp,
  pending: Clock,
};

const bgColorMap = {
  users: 'bg-purple-100',
  orders: 'bg-yellow-100',
  sales: 'bg-green-100',
  pending: 'bg-red-100',
};

function StatsCard({ title, value, change, type, isNegative = false }) {
  const Icon = iconMap[type];
  const bgColor = bgColorMap[type];

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <p className={`text-sm mt-2 ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
            {change}
          </p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg h-12 w-12 flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default StatsCard;