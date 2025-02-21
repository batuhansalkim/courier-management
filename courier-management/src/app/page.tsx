'use client';

import { Package, Truck, Clock, TrendingUp, MapPin, Phone } from 'lucide-react';

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

const recentOrders = [
  {
    id: 'SIP-2402-001',
    customer: 'Ahmet Yılmaz',
    address: 'Kadıköy, İstanbul',
    status: 'Yolda',
    time: '10 dk önce',
    amount: '₺145.00'
  },
  {
    id: 'SIP-2402-002',
    customer: 'Ayşe Demir',
    address: 'Beşiktaş, İstanbul',
    status: 'Teslim Edildi',
    time: '25 dk önce',
    amount: '₺230.50'
  },
  {
    id: 'SIP-2402-003',
    customer: 'Mehmet Kaya',
    address: 'Üsküdar, İstanbul',
    status: 'Hazırlanıyor',
    time: '35 dk önce',
    amount: '₺89.90'
  },
  {
    id: 'SIP-2402-004',
    customer: 'Zeynep Şahin',
    address: 'Ataşehir, İstanbul',
    status: 'Yolda',
    time: '45 dk önce',
    amount: '₺175.00'
  }
];

const activeCouriers = [
  {
    id: 'KRY-001',
    name: 'Ali Yıldız',
    status: 'Teslimat Yolunda',
    location: 'Kadıköy',
    deliveries: 8,
    phone: '0555-XXX-XX01'
  },
  {
    id: 'KRY-002',
    name: 'Murat Öztürk',
    status: 'Müsait',
    location: 'Beşiktaş',
    deliveries: 12,
    phone: '0555-XXX-XX02'
  },
  {
    id: 'KRY-003',
    name: 'Ayşe Çelik',
    status: 'Teslimat Yolunda',
    location: 'Üsküdar',
    deliveries: 6,
    phone: '0555-XXX-XX03'
  },
  {
    id: 'KRY-004',
    name: 'Can Demir',
    status: 'Mola',
    location: 'Maltepe',
    deliveries: 10,
    phone: '0555-XXX-XX04'
  }
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hoş Geldiniz 👋</h1>
        <p className="mt-1 text-muted-foreground">Günlük sipariş ve kurye durumlarını buradan takip edebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-card p-6 rounded-xl shadow-sm border border-border transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <span className={`text-sm font-medium text-${stat.color}-600 dark:text-${stat.color}-400 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 px-2.5 py-0.5 rounded-full`}>
                  {stat.trend}
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground">{stat.value}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-foreground mb-4">Son Siparişler</h3>
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{order.customer}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {order.address}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{order.amount}</p>
                    <p className="text-sm text-muted-foreground mt-1">{order.time}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{order.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'Teslim Edildi' 
                      ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      : order.status === 'Yolda'
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-sm border border-border transition-all hover:shadow-md">
          <h3 className="text-lg font-semibold text-foreground mb-4">Aktif Kuryeler</h3>
          <div className="divide-y divide-border">
            {activeCouriers.map((courier) => (
              <div key={courier.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{courier.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {courier.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-1" />
                      {courier.phone}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{courier.deliveries} Teslimat</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{courier.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    courier.status === 'Müsait'
                      ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      : courier.status === 'Teslimat Yolunda'
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                  }`}>
                    {courier.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
