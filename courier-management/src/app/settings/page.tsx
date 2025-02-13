'use client';

import { useState } from 'react';
import { 
  Bell, Lock, MapPin, CreditCard, 
  Settings as SettingsIcon,
  LucideIcon 
} from 'lucide-react';

// Ayar kategorileri
const settingCategories: SettingCategory[] = [
  {
    id: 'general',
    name: 'Genel',
    icon: SettingsIcon,
    settings: [
      {
        id: 'language',
        name: 'Dil',
        description: 'Arayüz dilini değiştir',
        type: 'select',
        options: [
          { value: 'tr', label: 'Türkçe' },
          { value: 'en', label: 'English' }
        ],
        value: 'tr'
      },
      {
        id: 'timezone',
        name: 'Saat Dilimi',
        description: 'Varsayılan saat dilimini ayarla',
        type: 'select',
        options: [
          { value: 'Europe/Istanbul', label: 'İstanbul (UTC+3)' },
          { value: 'Europe/London', label: 'London (UTC+0)' }
        ],
        value: 'Europe/Istanbul'
      }
    ]
  },
  {
    id: 'notifications',
    name: 'Bildirimler',
    icon: Bell,
    settings: [
      {
        id: 'email_notifications',
        name: 'E-posta Bildirimleri',
        description: 'Yeni siparişler ve güncellemeler için e-posta al',
        type: 'toggle',
        value: true
      },
      {
        id: 'push_notifications',
        name: 'Push Bildirimleri',
        description: 'Tarayıcı bildirimleri al',
        type: 'toggle',
        value: true
      }
    ]
  },
  {
    id: 'security',
    name: 'Güvenlik',
    icon: Lock,
    settings: [
      {
        id: 'two_factor',
        name: 'İki Faktörlü Doğrulama',
        description: 'Hesap güvenliğini artır',
        type: 'toggle',
        value: false
      },
      {
        id: 'session_timeout',
        name: 'Oturum Zaman Aşımı',
        description: 'Otomatik çıkış süresi',
        type: 'select',
        options: [
          { value: '30', label: '30 dakika' },
          { value: '60', label: '1 saat' },
          { value: '120', label: '2 saat' }
        ],
        value: '60'
      }
    ]
  },
  {
    id: 'maps',
    name: 'Harita',
    icon: MapPin,
    settings: [
      {
        id: 'default_zoom',
        name: 'Varsayılan Yakınlaştırma',
        description: 'Harita açılış yakınlaştırma seviyesi',
        type: 'select',
        options: [
          { value: '10', label: 'Şehir' },
          { value: '13', label: 'Semt' },
          { value: '15', label: 'Mahalle' }
        ],
        value: '13'
      },
      {
        id: 'traffic_layer',
        name: 'Trafik Katmanı',
        description: 'Haritada trafik durumunu göster',
        type: 'toggle',
        value: true
      }
    ]
  },
  {
    id: 'payment',
    name: 'Ödeme',
    icon: CreditCard,
    settings: [
      {
        id: 'default_payment',
        name: 'Varsayılan Ödeme Yöntemi',
        description: 'Yeni siparişler için varsayılan ödeme yöntemi',
        type: 'select',
        options: [
          { value: 'cash', label: 'Nakit' },
          { value: 'credit_card', label: 'Kredi Kartı' }
        ],
        value: 'cash'
      }
    ]
  }
];

interface Setting {
  id: string;
  name: string;
  description: string;
  type: 'toggle' | 'select';
  options?: { value: string; label: string }[];
  value: string | boolean;
}

interface SettingCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  settings: Setting[];
}

interface SettingsState {
  [key: string]: string | boolean;
}

export default function Settings() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [settings, setSettings] = useState(
    settingCategories.reduce((acc, category) => {
      category.settings.forEach(setting => {
        acc[setting.id] = setting.value;
      });
      return acc;
    }, {} as SettingsState)
  );

  const handleSettingChange = (settingId: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: value
    }));
  };

  const renderSettingInput = (setting: Setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={settings[setting.id] as boolean}
              onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
            />
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
              settings[setting.id] ? 'translate-x-6 bg-blue-600' : 'translate-x-1'
            }`} />
          </div>
        );
      case 'select':
        return (
          <select
            value={settings[setting.id] as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            {setting.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ayarlar</h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Sistem ayarlarını yapılandır</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Kategori Menüsü */}
        <div className="w-full lg:w-64 space-y-1">
          {settingCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
                  activeCategory === category.id
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Ayarlar İçeriği */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6">
          {settingCategories.find(c => c.id === activeCategory)?.settings.map((setting) => (
            <div
              key={setting.id}
              className="py-4 first:pt-0 last:pb-0 border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {setting.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {setting.description}
                  </p>
                </div>
                {renderSettingInput(setting)}
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-end gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              İptal
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 