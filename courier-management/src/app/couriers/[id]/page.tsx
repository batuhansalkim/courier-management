// This is the server component
import CourierDetailClient from './CourierDetailClient';

// Örnek kurye verisi
const courierData = {
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
  vehicleType: 'Motosiklet',
  vehiclePlate: '34 ABC 123',
  workingHours: '09:00 - 18:00',
  preferredRegions: ['Kadıköy', 'Üsküdar', 'Ataşehir']
};

// Son 7 günlük teslimat verileri
const deliveryData = {
  labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
  datasets: [
    {
      label: 'Teslimat Sayısı',
      data: [12, 15, 18, 14, 16, 10, 13],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: 'rgb(156, 163, 175)',
      }
    }
  }
};

// Son teslimatlar
const recentDeliveries = [
  {
    id: 'DEL001',
    customer: 'Mehmet K.',
    address: 'Bağdat Caddesi No:123',
    time: '14:30',
    status: 'completed'
  },
  {
    id: 'DEL002',
    customer: 'Ayşe D.',
    address: 'Moda Caddesi No:45',
    time: '13:15',
    status: 'completed'
  },
  {
    id: 'DEL003',
    customer: 'Ali R.',
    address: 'Fenerbahçe Mahallesi',
    time: '12:00',
    status: 'completed'
  }
];

// Generate static params for all courier IDs
export async function generateStaticParams() {
  // You should replace this with your actual courier IDs from your data source
  const courierIds = [1, 2, 3, 4, 5]; // Example static IDs
  
  return courierIds.map((id) => ({
    id: id.toString(),
  }));
}

export default function CourierDetailPage() {
  return <CourierDetailClient 
    courierData={courierData} 
    deliveryData={deliveryData} 
    chartOptions={chartOptions} 
    recentDeliveries={recentDeliveries} 
  />;
}