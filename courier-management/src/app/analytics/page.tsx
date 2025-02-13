'use client';

import { Calendar, Clock, TrendingUp, Users } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const performanceMetrics = [
  {
    title: 'Ortalama Teslimat Süresi',
    value: '28 dakika',
    change: '-5%',
    trend: 'down',
    icon: Clock
  },
  {
    title: 'Günlük Teslimat',
    value: '142',
    change: '+18%',
    trend: 'up',
    icon: Calendar
  },
  {
    title: 'Aktif Kuryeler',
    value: '8',
    change: '+3%',
    trend: 'up',
    icon: Users
  },
  {
    title: 'Başarı Oranı',
    value: '%98.5',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp
  }
];

const courierPerformance = [
  { name: 'Ahmet K.', deliveries: 32, rating: 4.8, onTime: '95%' },
  { name: 'Mehmet Y.', deliveries: 28, rating: 4.9, onTime: '98%' },
  { name: 'Ali R.', deliveries: 25, rating: 4.7, onTime: '92%' },
  { name: 'Ayşe D.', deliveries: 30, rating: 4.9, onTime: '97%' },
];

// Örnek veri - son 7 günlük teslimat sayıları
const deliveryData = {
  labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
  datasets: [
    {
      label: 'Günlük Teslimat',
      data: [125, 132, 143, 128, 152, 135, 142],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    }
  ]
};

// Örnek veri - teslimat süreleri dağılımı
const deliveryTimeData = {
  labels: ['15-20 dk', '20-25 dk', '25-30 dk', '30-35 dk', '35-40 dk', '40+ dk'],
  datasets: [
    {
      label: 'Teslimat Sayısı',
      data: [45, 73, 82, 53, 34, 12],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
    }
  ]
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgb(156, 163, 175)', // text-gray-400
      }
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)', // text-gray-400 with opacity
      },
      ticks: {
        color: 'rgb(156, 163, 175)', // text-gray-400
      }
    },
    y: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      }
    }
  }
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgb(156, 163, 175)',
      }
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      }
    },
    y: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      }
    }
  }
};

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analitik</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Teslimat performansı ve istatistikler</p>
      </div>

      {/* Performans Metrikleri */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
                } px-2.5 py-0.5 rounded-full`}>
                  {metric.change}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Günlük Teslimat Trendi</h3>
          <div className="h-64">
            <Line data={deliveryData} options={lineChartOptions} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Teslimat Süresi Dağılımı</h3>
          <div className="h-64">
            <Bar data={deliveryTimeData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Kurye Performansı Tablosu */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kurye Performansı</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Son 7 günlük performans verileri</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kurye
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Teslimat Sayısı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Müşteri Puanı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Zamanında Teslimat
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {courierPerformance.map((courier) => (
                <tr key={courier.name} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{courier.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{courier.deliveries}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{courier.rating}</span>
                      <div className="ml-2 flex text-yellow-400">
                        {'★'.repeat(Math.floor(courier.rating))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{courier.onTime}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 