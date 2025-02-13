'use client';

import { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Package, 
  Truck, DollarSign, Clock, Star 
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Performans metrikleri
const performanceMetrics = {
  dailyDeliveries: {
    value: 156,
    trend: 12.5,
    isPositive: true
  },
  activeOrders: {
    value: 45,
    trend: -5.2,
    isPositive: false
  },
  activeCouriers: {
    value: 28,
    trend: 8.3,
    isPositive: true
  },
  revenue: {
    value: 12580,
    trend: 15.7,
    isPositive: true
  },
  avgDeliveryTime: {
    value: 28,
    trend: -12.4,
    isPositive: true
  },
  customerSatisfaction: {
    value: 4.8,
    trend: 2.1,
    isPositive: true
  }
};

// Bölge bazlı teslimat verileri
const regionData = [
  { name: 'Kadıköy', deliveries: 450, revenue: 15600 },
  { name: 'Beşiktaş', deliveries: 380, revenue: 12800 },
  { name: 'Şişli', deliveries: 320, revenue: 10900 },
  { name: 'Üsküdar', deliveries: 290, revenue: 9800 },
  { name: 'Ataşehir', deliveries: 250, revenue: 8500 }
];

// Teslimat trendi verileri
const deliveryTrendData = [
  { name: 'Pzt', deliveries: 120, revenue: 4200 },
  { name: 'Sal', deliveries: 145, revenue: 5100 },
  { name: 'Çar', deliveries: 135, revenue: 4800 },
  { name: 'Per', deliveries: 160, revenue: 5600 },
  { name: 'Cum', deliveries: 180, revenue: 6300 },
  { name: 'Cmt', deliveries: 190, revenue: 6650 },
  { name: 'Paz', deliveries: 156, revenue: 5460 }
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Performans metrikleri ve analizler</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="today">Bugün</option>
          <option value="week">Bu Hafta</option>
          <option value="month">Bu Ay</option>
          <option value="year">Bu Yıl</option>
        </select>
      </div>

      {/* Ana Metrikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Günlük Teslimat */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Günlük Teslimat</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {performanceMetrics.dailyDeliveries.value}
                </h3>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              performanceMetrics.dailyDeliveries.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {performanceMetrics.dailyDeliveries.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(performanceMetrics.dailyDeliveries.trend)}%</span>
            </div>
          </div>
        </div>

        {/* Aktif Siparişler */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Package className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktif Siparişler</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {performanceMetrics.activeOrders.value}
                </h3>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              performanceMetrics.activeOrders.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {performanceMetrics.activeOrders.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(performanceMetrics.activeOrders.trend)}%</span>
            </div>
          </div>
        </div>

        {/* Aktif Kuryeler */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktif Kuryeler</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {performanceMetrics.activeCouriers.value}
                </h3>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              performanceMetrics.activeCouriers.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {performanceMetrics.activeCouriers.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(performanceMetrics.activeCouriers.trend)}%</span>
            </div>
          </div>
        </div>

        {/* Gelir */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Toplam Gelir</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {performanceMetrics.revenue.value} TL
                </h3>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              performanceMetrics.revenue.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {performanceMetrics.revenue.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(performanceMetrics.revenue.trend)}%</span>
            </div>
          </div>
        </div>

        {/* Ortalama Teslimat Süresi */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ort. Teslimat Süresi</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {performanceMetrics.avgDeliveryTime.value} dk
                </h3>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              performanceMetrics.avgDeliveryTime.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {performanceMetrics.avgDeliveryTime.isPositive ? (
                <TrendingDown className="h-4 w-4" />
              ) : (
                <TrendingUp className="h-4 w-4" />
              )}
              <span>{Math.abs(performanceMetrics.avgDeliveryTime.trend)}%</span>
            </div>
          </div>
        </div>

        {/* Müşteri Memnuniyeti */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <Star className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Müşteri Memnuniyeti</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {performanceMetrics.customerSatisfaction.value}/5
                </h3>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              performanceMetrics.customerSatisfaction.isPositive 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {performanceMetrics.customerSatisfaction.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>{Math.abs(performanceMetrics.customerSatisfaction.trend)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bölge Bazlı Performans */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bölge Bazlı Performans</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Bölge
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Teslimat Sayısı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Gelir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performans
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {regionData.map((region) => (
                <tr key={region.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {region.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {region.deliveries}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {region.revenue} TL
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(region.deliveries / regionData[0].deliveries) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teslimat ve Gelir Trendi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Teslimat Trendi */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Teslimat Trendi</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={deliveryTrendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="deliveryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="deliveries"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#deliveryGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gelir Trendi */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gelir Trendi</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deliveryTrendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 