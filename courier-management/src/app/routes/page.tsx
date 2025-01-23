'use client';

import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Package, MapPin } from 'lucide-react';

const center = {
  lat: 41.0082,
  lng: 28.9784 // İstanbul koordinatları
};

const couriers = [
  {
    id: 1,
    name: 'Ahmet K.',
    location: { lat: 41.0082, lng: 28.9784 },
    currentOrder: {
      id: 'ORD001',
      pickup: { lat: 41.0151, lng: 28.9795, address: 'Taksim, İstanbul' },
      delivery: { lat: 41.0099, lng: 28.9619, address: 'Beşiktaş, İstanbul' },
      status: 'Yolda'
    }
  },
  {
    id: 2,
    name: 'Mehmet Y.',
    location: { lat: 41.0055, lng: 28.9744 },
    currentOrder: {
      id: 'ORD002',
      pickup: { lat: 41.0082, lng: 28.9784, address: 'Şişli, İstanbul' },
      delivery: { lat: 41.0091, lng: 28.9783, address: 'Mecidiyeköy, İstanbul' },
      status: 'Teslimatta'
    }
  }
];

export default function Routes() {
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [directions, setDirections] = useState(null);

  const handleCourierSelect = (courier) => {
    setSelectedCourier(courier);
    // Google Maps Directions API'sini kullanarak rota çizimi
    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: courier.currentOrder.pickup,
        destination: courier.currentOrder.delivery,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rota Takibi</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Kuryelerin anlık konumları ve rotaları</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kurye Listesi */}
        <div className="lg:col-span-1 space-y-4">
          {couriers.map((courier) => (
            <div
              key={courier.id}
              onClick={() => handleCourierSelect(courier)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedCourier?.id === courier.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{courier.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sipariş: {courier.currentOrder.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  courier.currentOrder.status === 'Yolda'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                }`}>
                  {courier.currentOrder.status}
                </span>
              </div>

              {selectedCourier?.id === courier.id && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">Alış: {courier.currentOrder.pickup.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">Teslimat: {courier.currentOrder.delivery.address}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Harita */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '600px' }}
              center={center}
              zoom={13}
              options={{
                styles: theme === 'dark' ? darkMapStyle : [],
                streetViewControl: false,
                mapTypeControl: false
              }}
            >
              {couriers.map((courier) => (
                <Marker
                  key={courier.id}
                  position={courier.location}
                  icon={{
                    url: '/courier-marker.png', // Kurye için özel marker ikonu
                    scaledSize: new google.maps.Size(40, 40)
                  }}
                />
              ))}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

// Dark mode harita stili
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  // ... Daha fazla stil eklenebilir
]; 