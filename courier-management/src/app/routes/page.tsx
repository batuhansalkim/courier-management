'use client';

import { MapPin, Clock, Package, ChevronRight, MoreVertical, User, Phone } from 'lucide-react';

const routes = [
  {
    id: 'RT-001',
    courier: {
      name: 'Ali Yıldız',
      phone: '0555-XXX-XX01',
      photo: '👨‍✈️'
    },
    stops: [
      {
        type: 'pickup',
        address: 'Bağdat Caddesi No:123, Kadıköy',
        time: '09:30',
        customer: 'Cafe Nero',
        status: 'Tamamlandı'
      },
      {
        type: 'delivery',
        address: 'Acıbadem Mah. No:45, Kadıköy',
        time: '09:45',
        customer: 'Mehmet Yılmaz',
        status: 'Tamamlandı'
      },
      {
        type: 'delivery',
        address: 'Kozyatağı Mah. No:78, Kadıköy',
        time: '10:00',
        customer: 'Ayşe Demir',
        status: 'Yolda'
      }
    ]
  },
  {
    id: 'RT-002',
    courier: {
      name: 'Ayşe Çelik',
      phone: '0555-XXX-XX03',
      photo: '👩‍✈️'
    },
    stops: [
      {
        type: 'pickup',
        address: 'Barbaros Bulvarı No:56, Beşiktaş',
        time: '10:15',
        customer: 'Starbucks',
        status: 'Beklemede'
      },
      {
        type: 'delivery',
        address: 'Levent Mah. No:12, Beşiktaş',
        time: '10:30',
        customer: 'Can Yılmaz',
        status: 'Beklemede'
      }
    ]
  }
];

export default function RoutesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Rota Planı</h1>
        <p className="mt-1 text-muted-foreground">Kuryelerin günlük rotalarını ve durumlarını takip edin.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {routes.map((route) => (
          <div key={route.id} className="bg-card rounded-xl shadow-sm border border-border">
            {/* Kurye Bilgileri */}
            <div className="p-6 flex items-center justify-between border-b border-border">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{route.courier.photo}</div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{route.courier.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Phone className="h-4 w-4 mr-1" />
                    {route.courier.phone}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Rota ID: {route.id}</span>
                <button className="p-2 hover:bg-muted rounded-full">
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Duraklar */}
            <div className="p-6 space-y-6">
              {route.stops.map((stop, index) => (
                <div key={index} className="flex items-start">
                  {/* Sol taraf - zaman çizgisi */}
                  <div className="flex flex-col items-center mr-4">
                    <div className="text-sm font-medium text-foreground">{stop.time}</div>
                    <div className="mt-1 w-px h-full bg-border relative">
                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${
                        stop.status === 'Tamamlandı' 
                          ? 'bg-green-500'
                          : stop.status === 'Yolda'
                          ? 'bg-blue-500'
                          : 'bg-orange-500'
                      }`} />
                    </div>
                  </div>

                  {/* Sağ taraf - durak detayları */}
                  <div className="flex-1 pb-6">
                    <div className={`p-4 rounded-lg ${
                      stop.type === 'pickup' 
                        ? 'bg-blue-50 dark:bg-blue-900/20'
                        : 'bg-purple-50 dark:bg-purple-900/20'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <span className={`text-sm font-medium ${
                              stop.type === 'pickup'
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-purple-600 dark:text-purple-400'
                            }`}>
                              {stop.type === 'pickup' ? 'Alım Noktası' : 'Teslimat Noktası'}
                            </span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center text-foreground">
                              <User className="h-4 w-4 mr-2" />
                              <span>{stop.customer}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{stop.address}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stop.status === 'Tamamlandı'
                            ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                            : stop.status === 'Yolda'
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                        }`}>
                          {stop.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}