'use client';

import { useState } from 'react';
import { Search, Plus, MapPin, Phone, Mail } from 'lucide-react';

// Türkiye'deki iller ve ilçeler
const cities: { [key: string]: string[] } = {
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Şişli', 'Maltepe', 'Ataşehir'],
  'Ankara': ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut'],
  'İzmir': ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Çiğli'],
  'Bursa': ['Nilüfer', 'Osmangazi', 'Yıldırım', 'Mudanya'],
  'Antalya': ['Muratpaşa', 'Konyaaltı', 'Kepez', 'Lara']
};

// Araç tipleri
const vehicleTypes = [
  'Motosiklet',
  'Elektrikli Bisiklet',
  'Bisiklet',
  'Araç'
];

// Vardiya saatleri
const shifts = [
  '08:00 - 16:00',
  '10:00 - 18:00',
  '12:00 - 20:00',
  '14:00 - 22:00'
];

// Kullanıcı rolleri
const userRoles = {
  ADMIN: 'admin',
  COURIER: 'courier',
  SUPPORT: 'support'
} as const;

// Rol bazlı izinler
const rolePermissions = {
  [userRoles.ADMIN]: ['manage_couriers', 'view_reports', 'manage_system'],
  [userRoles.COURIER]: ['view_tasks', 'update_delivery_status', 'view_route'],
  [userRoles.SUPPORT]: ['view_issues', 'resolve_issues', 'contact_customer']
} as const;

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
    joinDate: '2023-01-15',
    shift: '08:00 - 16:00',
    vehicleType: 'Motosiklet',
    documents: ['Ehliyet', 'Sabıka Kaydı', 'İkametgah'],
    salary: '8500',
    role: userRoles.COURIER,
    emergencyContact: '0533 XXX XX XX',
    trainingStatus: [
      { name: 'Güvenli Sürüş', completed: true, date: '2023-02-01' },
      { name: 'Müşteri İlişkileri', completed: true, date: '2023-02-15' },
      { name: 'İlk Yardım', completed: false, date: null }
    ],
    performanceMetrics: {
      onTimeDeliveryRate: 95,
      customerSatisfaction: 4.8,
      averageDeliveryTime: 25, // dakika
      monthlyDeliveries: 280
    },
    assignedZones: ['Kadıköy-1', 'Kadıköy-2', 'Ataşehir-1'],
    certifications: ['Motosiklet Ehliyeti', 'İlk Yardım Sertifikası']
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
    joinDate: '2023-03-20',
    shift: '10:00 - 18:00',
    vehicleType: 'Elektrikli Bisiklet',
    documents: ['Ehliyet', 'Sabıka Kaydı'],
    salary: '7500'
  },
  // Daha fazla kurye eklenebilir
];

export default function Couriers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('Tümü');
  const [selectedRegion, setSelectedRegion] = useState('Tümü');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVehicle, setFilterVehicle] = useState('all');
  const [userRole, setUserRole] = useState(userRoles.ADMIN); // Varsayılan olarak admin

  // Seçilen şehre göre ilçeleri getir
  const regions = selectedCity !== 'Tümü' ? cities[selectedCity] || [] : [];

  // Rol bazlı erişim kontrolü
  const hasPermission = (permission) => {
    return rolePermissions[userRole]?.includes(permission);
  };

  return (
    <div className="space-y-6">
      {/* Rol seçici (sadece geliştirme aşamasında) */}
      <div className="flex items-center gap-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Test Modu - Rol:</span>
        <select
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="px-3 py-1 text-sm border border-yellow-300 rounded-md bg-white dark:bg-yellow-900/30"
        >
          {Object.values(userRoles).map((role) => (
            <option key={role} value={role}>{role.toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Yetkilendirme kontrollü butonlar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kuryeler</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Tüm kuryeleri görüntüle ve yönet</p>
        </div>
        {hasPermission('manage_couriers') && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Yeni Kurye Ekle
          </button>
        )}
      </div>

      {/* Gelişmiş Filtreleme */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Kurye adı, telefon veya e-posta ile ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedRegion('Tümü');
            }}
          >
            <option value="Tümü">Tüm Şehirler</option>
            {Object.keys(cities).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            disabled={selectedCity === 'Tümü'}
          >
            <option value="Tümü">Tüm Bölgeler</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
            <option value="onLeave">İzinde</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={filterVehicle}
            onChange={(e) => setFilterVehicle(e.target.value)}
          >
            <option value="all">Tüm Araç Tipleri</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Kurye Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {couriers.map((courier) => (
          <div key={courier.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700">
                  {/* Kurye fotoğrafı */}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{courier.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    {courier.city}, {courier.region}
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                courier.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
              }`}>
                {courier.status === 'active' ? 'Aktif' : 'Pasif'}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Phone className="h-4 w-4" />
                {courier.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Mail className="h-4 w-4" />
                {courier.email}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Puan</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{courier.rating}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Teslimat</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{courier.totalDeliveries}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Başlangıç</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                    {new Date(courier.joinDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Performans Metrikleri */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Performans Metrikleri</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Zamanında Teslimat</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    %{courier.performanceMetrics.onTimeDeliveryRate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Müşteri Memnuniyeti</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {courier.performanceMetrics.customerSatisfaction}/5
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ort. Teslimat Süresi</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {courier.performanceMetrics.averageDeliveryTime} dk
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Aylık Teslimat</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {courier.performanceMetrics.monthlyDeliveries}
                  </p>
                </div>
              </div>
            </div>

            {/* Eğitim Durumu */}
            <div className="mt-4 p-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Eğitim Durumu</h4>
              <div className="space-y-2">
                {courier.trainingStatus.map((training, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {training.completed ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      ) : (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      )}
                      <span className="text-sm text-gray-700 dark:text-gray-300">{training.name}</span>
                    </div>
                    {training.completed && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(training.date).toLocaleDateString('tr-TR')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sertifikalar */}
            <div className="mt-4 p-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sertifikalar</h4>
              <div className="flex flex-wrap gap-2">
                {courier.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Acil Durum İletişim */}
            {hasPermission('manage_couriers') && (
              <div className="mt-4 p-4 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Acil Durum İletişim</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{courier.emergencyContact}</p>
              </div>
            )}

            {/* Atanmış Bölgeler */}
            <div className="mt-4 p-4 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Atanmış Bölgeler</h4>
              <div className="flex flex-wrap gap-2">
                {courier.assignedZones.map((zone, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>

            {/* İşlem Butonları */}
            <div className="mt-4 p-4 border-t border-gray-100 dark:border-gray-700 flex gap-2">
              {hasPermission('view_route') && (
              <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors">
                  Rotayı Görüntüle
              </button>
              )}
              {hasPermission('manage_couriers') && (
              <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400 dark:hover:bg-gray-900/30 transition-colors">
                Düzenle
              </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Geliştirilmiş Yeni Kurye Ekleme Modal'ı */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Yeni Kurye Ekle</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kişisel Bilgiler */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Kişisel Bilgiler</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ad Soyad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    TC Kimlik No
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="TC Kimlik No"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Doğum Tarihi
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* İletişim Bilgileri */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">İletişim Bilgileri</h3>
                
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Adres
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Açık adres"
                    rows={3}
                  />
                </div>
              </div>

              {/* Çalışma Bilgileri */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Çalışma Bilgileri</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Şehir
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="">Şehir Seçin</option>
                    {Object.keys(cities).map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Çalışma Bölgesi
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="">Bölge Seçin</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Vardiya
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="">Vardiya Seçin</option>
                    {shifts.map((shift) => (
                      <option key={shift} value={shift}>{shift}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Araç Bilgileri */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Araç Bilgileri</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Araç Tipi
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                    <option value="">Araç Tipi Seçin</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Plaka
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="34 ABC 123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ehliyet Sınıfı
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="A1, B vs."
                  />
                </div>
              </div>
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
    </div>
  );
} 