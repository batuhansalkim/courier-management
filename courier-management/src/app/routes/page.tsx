/// <reference types="google.maps" />
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Package, MapPin } from 'lucide-react';
import { useTheme } from 'next-themes';

// Google Maps bileşenlerini dinamik olarak import et
const GoogleMap = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.GoogleMap),
  { ssr: false }
);

const LoadScript = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.LoadScript),
  { ssr: false }
);

const Marker = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.Marker),
  { ssr: false }
);

const DirectionsRenderer = dynamic(
  () => import('@react-google-maps/api').then((mod) => mod.DirectionsRenderer),
  { ssr: false }
);

interface Location {
  lat: number;
  lng: number;
}

interface Order {
  id: string;
  pickup: Location;
  delivery: Location;
  status: string;
}

interface Courier {
  id: number;
  name: string;
  location: Location;
  status: string;
  currentOrder: Order;
}

const center = {
  lat: 41.0082,
  lng: 28.9784 // İstanbul koordinatları
};

// Örnek kurye verileri
const courierData: Courier[] = [
  {
    id: 1,
    name: 'Ahmet K.',
    location: {
      lat: 41.0082,
      lng: 28.9784
    },
    status: 'active',
    currentOrder: {
      id: 'ORD-001',
      pickup: {
        lat: 41.0151,
        lng: 28.9795
      },
      delivery: {
        lat: 41.0219,
        lng: 28.9806
      },
      status: 'in_progress'
    }
  },
  {
    id: 2,
    name: 'Mehmet S.',
    location: {
      lat: 41.0151,
      lng: 28.9795
    },
    status: 'active',
    currentOrder: {
      id: 'ORD-002',
      pickup: {
        lat: 41.0219,
        lng: 28.9806
      },
      delivery: {
        lat: 41.0082,
        lng: 28.9784
      },
      status: 'in_progress'
    }
  }
];

export default function Routes() {
  const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [couriers, setCouriers] = useState<Courier[]>([]);

  useEffect(() => {
    setIsClient(true);
    setCouriers(courierData);
  }, []);

  const handleCourierSelect = (courier: Courier) => {
    if (!isClient || !window.google) return;
    
    setSelectedCourier(courier);
    // Google Maps Directions API'sini kullanarak rota çizimi
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: new window.google.maps.LatLng(courier.location.lat, courier.location.lng),
        destination: new window.google.maps.LatLng(
          courier.currentOrder.delivery.lat,
          courier.currentOrder.delivery.lng
        ),
        waypoints: [
          {
            location: new window.google.maps.LatLng(
              courier.currentOrder.pickup.lat,
              courier.currentOrder.pickup.lng
            ),
            stopover: true
          }
        ],
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        }
      }
    );
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Rota Yönetimi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kurye Listesi */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-lg font-semibold mb-4">Kuryeler</h2>
          <div className="space-y-4">
            {couriers.map((courier) => (
              <div
                key={courier.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedCourier?.id === courier.id
                    ? 'bg-blue-50 dark:bg-blue-900'
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleCourierSelect(courier)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{courier.name}</h3>
                    <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <Package className="w-4 h-4 mr-1" />
                      <span>Sipariş: {courier.currentOrder.id}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        Konum: {courier.location.lat.toFixed(4)},{' '}
                        {courier.location.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      courier.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                    }`}
                  >
                    {courier.status === 'active' ? 'Aktif' : 'Pasif'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Harita */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <LoadScript 
            id="google-maps-script"
            googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
          >
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '600px' }}
              center={center}
              zoom={13}
              options={{
                styles: theme === 'dark' ? mapDarkStyle : [],
                disableDefaultUI: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                fullscreenControl: true
              }}
            >
              {/* Kurye konumları */}
              {couriers.map((courier) => (
                <Marker
                  key={courier.id}
                  position={{
                    lat: courier.location.lat,
                    lng: courier.location.lng
                  }}
                  icon={{
                    url: '/courier-marker.png',
                    scaledSize: new window.google.maps.Size(32, 32)
                  }}
                />
              ))}

              {/* Rota çizimi */}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

// Harita karanlık mod stili
const mapDarkStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#242f3e' }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#242f3e' }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
];