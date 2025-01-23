'use client';

import { Package, Truck, Clock, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Aktif Siparişler',
    value: '24',
    icon: Package,
    trend: '+12%',
    color: 'blue'
  },
  {
    title: 'Aktif Kuryeler',
    value: '8',
    icon: Truck,
    trend: '+3%',
    color: 'green'
  },
  {
    title: 'Ortalama Teslimat',
    value: '28 dk',
    icon: Clock,
    trend: '-5%',
    color: 'purple'
  },
  {
    title: 'Günlük Teslimat',
    value: '142',
    icon: TrendingUp,
    trend: '+18%',
    color: 'orange'
  }
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hoş Geldiniz 👋</h1>
        <p className="mt-1 text-gray-500">Günlük sipariş ve kurye durumlarını buradan takip edebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <Icon className={`h-8 w-8 text-${stat.color}-500`} />
                <span className={`text-sm font-medium text-${stat.color}-600 bg-${stat.color}-50 px-2.5 py-0.5 rounded-full`}>
                  {stat.trend}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</h2>
              <p className="mt-1 text-sm text-gray-500">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Son Siparişler</h3>
          {/* Buraya son siparişler tablosu gelecek */}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Aktif Kuryeler</h3>
          {/* Buraya aktif kuryeler listesi gelecek */}
        </div>
      </div>
    </div>
  );
}
