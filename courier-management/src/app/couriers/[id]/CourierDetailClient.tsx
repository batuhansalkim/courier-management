'use client';

import { ArrowLeft, MapPin, Phone, Mail, Star, Package, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Line } from 'react-chartjs-2';

interface CourierDetailClientProps {
  courierData: {
    id: number;
    name: string;
    photo: string;
    city: string;
    region: string;
    phone: string;
    email: string;
    status: string;
    rating: number;
    totalDeliveries: number;
    joinDate: string;
    vehicleType: string;
    vehiclePlate: string;
    workingHours: string;
    preferredRegions: string[];
  };
  deliveryData: any;
  chartOptions: any;
  recentDeliveries: any[];
}

export default function CourierDetailClient({ 
  courierData,
  deliveryData,
  chartOptions,
  recentDeliveries
}: CourierDetailClientProps) {
  return (
    <div className="space-y-6">
      {/* Üst Başlık */}
      <div className="flex items-center gap-4">
        <Link 
          href="/couriers"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{courierData.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">Kurye ID: #{courierData.id}</p>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - Kurye Bilgileri */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profil Kartı */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700">
                {/* Kurye fotoğrafı */}
              </div>
              <div>
                <h2 className="font-medium text-gray-900 dark:text-white">{courierData.name}</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {courierData.city}, {courierData.region}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{courierData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{courierData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">{courierData.workingHours}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Tercih Ettiği Bölgeler</h3>
              <div className="flex flex-wrap gap-2">
                {courierData.preferredRegions.map((region) => (
                  <span 
                    key={region}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Araç Bilgileri */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Araç Bilgileri</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Araç Tipi</span>
                <span className="text-gray-900 dark:text-white">{courierData.vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Plaka</span>
                <span className="text-gray-900 dark:text-white">{courierData.vehiclePlate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Performans ve Teslimatlar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performans Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Puan</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{courierData.rating}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <Package className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Toplam Teslimat</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{courierData.totalDeliveries}</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Başarı Oranı</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">%98.5</p>
            </div>
          </div>

          {/* Teslimat Grafiği */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Son 7 Gün Teslimat Performansı</h3>
            <div className="h-64">
              <Line data={deliveryData} options={chartOptions} />
            </div>
          </div>

          {/* Son Teslimatlar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Son Teslimatlar</h3>
            <div className="space-y-4">
              {recentDeliveries.map((delivery) => (
                <div 
                  key={delivery.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{delivery.customer}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{delivery.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{delivery.time}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Tamamlandı</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
