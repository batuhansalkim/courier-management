'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, MapPin, Package, Truck, Clock } from 'lucide-react';

// Türkiye'deki iller ve ilçeler
const cities = {
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Şişli', 'Maltepe', 'Ataşehir'],
  'Ankara': ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut'],
  'İzmir': ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Çiğli'],
  'Bursa': ['Nilüfer', 'Osmangazi', 'Yıldırım', 'Mudanya'],
  'Antalya': ['Muratpaşa', 'Konyaaltı', 'Kepez', 'Lara']
};

// Tarih formatlama fonksiyonu
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Sipariş durumları
type OrderStatus = typeof orderStatuses[keyof typeof orderStatuses];

const orderStatuses = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  ASSIGNED: 'assigned',
  ON_WAY: 'on_way',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned'
} as const;

// Sipariş durumlarının Türkçe karşılıkları
const orderStatusLabels = {
  [orderStatuses.PENDING]: 'Beklemede',
  [orderStatuses.PREPARING]: 'Hazırlanıyor',
  [orderStatuses.ASSIGNED]: 'Kurye Atandı',
  [orderStatuses.ON_WAY]: 'Yolda',
  [orderStatuses.DELIVERED]: 'Teslim Edildi',
  [orderStatuses.CANCELLED]: 'İptal Edildi',
  [orderStatuses.RETURNED]: 'İade Edildi'
} as const;

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Courier {
  id: number;
  name: string;
  phone: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  pickupAddress: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  assignedCourier: Courier | null;
  items: OrderItem[];
  price: number;
  paymentMethod: string;
  notes: string;
}

// Örnek sipariş verileri
const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Mehmet Yılmaz',
    customerPhone: '0533 XXX XX XX',
    deliveryAddress: 'Kadıköy, İstanbul',
    pickupAddress: 'Üsküdar, İstanbul',
    status: orderStatuses.PENDING,
    createdAt: '2024-02-20T10:30:00',
    estimatedDeliveryTime: '2024-02-20T11:30:00',
    assignedCourier: null,
    items: [
      { id: 'PKG-001', name: 'Paket 1', quantity: 1, price: 100 }
    ],
    price: 150,
    paymentMethod: 'Nakit',
    notes: 'Dikkatli taşınması gerekiyor'
  },
  {
    id: 'ORD-002',
    customerName: 'Ayşe Demir',
    customerPhone: '0534 XXX XX XX',
    deliveryAddress: 'Beşiktaş, İstanbul',
    pickupAddress: 'Şişli, İstanbul',
    status: orderStatuses.PREPARING,
    createdAt: '2024-02-20T09:15:00',
    estimatedDeliveryTime: '2024-02-20T10:15:00',
    assignedCourier: {
      id: 1,
      name: 'Ahmet Yılmaz',
      phone: '0532 XXX XX XX'
    },
    items: [
      { id: 'PKG-002', name: 'Paket 1', quantity: 1, price: 200 }
    ],
    price: 200,
    paymentMethod: 'Kredi Kartı',
    notes: ''
  }
];

// Örnek kurye verileri
const couriers = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    photo: '/avatars/courier-1.jpg',
    city: 'İstanbul',
    region: 'Kadıköy',
    phone: '0532 XXX XX XX',
    email: 'ahmet.y@example.com',
    status: 'active',
    rating: 4.8,
    totalDeliveries: 1250,
    vehicleType: 'Motosiklet'
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    photo: '/avatars/courier-2.jpg',
    city: 'İstanbul',
    region: 'Beşiktaş',
    phone: '0533 XXX XX XX',
    email: 'ayse.d@example.com',
    status: 'active',
    rating: 4.9,
    totalDeliveries: 890,
    vehicleType: 'Elektrikli Bisiklet'
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    photo: '/avatars/courier-3.jpg',
    city: 'İstanbul',
    region: 'Üsküdar',
    phone: '0535 XXX XX XX',
    email: 'mehmet.k@example.com',
    status: 'active',
    rating: 4.7,
    totalDeliveries: 750,
    vehicleType: 'Motosiklet'
  }
];

export default function Orders() {
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCity, setSelectedCity] = useState('Tümü');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sipariş durumuna göre stil belirleme
  const getStatusStyle = (status: OrderStatus) => {
    const styles = {
      [orderStatuses.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      [orderStatuses.PREPARING]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      [orderStatuses.ASSIGNED]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      [orderStatuses.ON_WAY]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
      [orderStatuses.DELIVERED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      [orderStatuses.CANCELLED]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      [orderStatuses.RETURNED]: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    };
    return styles[status];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Siparişler</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Tüm siparişleri görüntüle ve yönet</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Yeni Sipariş
        </button>
      </div>

      {/* Filtreleme */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Sipariş ID, müşteri adı veya telefon ile ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Tüm Durumlar</option>
            {Object.entries(orderStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="Tümü">Tüm Şehirler</option>
            {Object.keys(cities).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">Tüm Ödeme Yöntemleri</option>
            <option value="cash">Nakit</option>
            <option value="card">Kredi Kartı</option>
          </select>
        </div>
      </div>

      {/* Sipariş Listesi */}
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl p-6" suppressHydrationWarning>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">{order.id}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(order.status)}`}>
                    {orderStatusLabels[order.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {order.customerName} - {order.customerPhone}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{order.price} TL</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{order.paymentMethod}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Teslimat Adresi</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.deliveryAddress}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Paket Detayları</p>
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm text-gray-500 dark:text-gray-400">
                        {item.name} - {item.quantity} adet ({item.price} TL)
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {order.assignedCourier ? (
                  <div className="flex items-start gap-2">
                    <Truck className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Atanan Kurye</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.assignedCourier.name} - {order.assignedCourier.phone}
                      </p>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowAssignModal(true);
                    }}
                    className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    Kurye Ata
                  </button>
                )}
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tahmini Teslimat</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400" suppressHydrationWarning>
                      {isClient ? formatDate(order.estimatedDeliveryTime) : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {order.notes && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">{order.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Yeni Sipariş Modal'ı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" suppressHydrationWarning>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Yeni Sipariş</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Müşteri Bilgileri */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Müşteri Bilgileri</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Müşteri Ad Soyad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0532 XXX XX XX"
                  />
                </div>
              </div>

              {/* Teslimat Bilgileri */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Teslimat Bilgileri</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Alış Adresi
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Alış adresi"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Teslimat Adresi
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Teslimat adresi"
                    rows={2}
                  />
                </div>
              </div>

              {/* Paket Bilgileri */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Paket Bilgileri</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Paket Boyutu
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="">Boyut Seçin</option>
                    <option value="small">Küçük</option>
                    <option value="medium">Orta</option>
                    <option value="large">Büyük</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ağırlık (kg)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ağırlık"
                  />
                </div>
              </div>

              {/* Ödeme Bilgileri */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Ödeme Bilgileri</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ücret (TL)
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ödeme Yöntemi
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="">Ödeme Yöntemi Seçin</option>
                    <option value="cash">Nakit</option>
                    <option value="card">Kredi Kartı</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notlar
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Varsa ekstra notlar"
                rows={2}
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                İptal
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kurye Atama Modal'ı */}
      {showAssignModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" suppressHydrationWarning>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Kurye Ata - {selectedOrder.id}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Teslimat Bölgesi
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="">Bölge Seçin</option>
                  {Object.keys(cities).map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Uygun Kuryeler
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {couriers.map((courier) => (
                    <label
                      key={courier.id}
                      className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="courier"
                          value={courier.id}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{courier.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {courier.city}, {courier.region} • {courier.vehicleType}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-900 dark:text-white">
                          {courier.totalDeliveries} Teslimat
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {courier.rating} Puan
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedOrder(null);
                }}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                İptal
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Kurye Ata
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 