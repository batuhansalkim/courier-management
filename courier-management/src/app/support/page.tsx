'use client';

import { useState } from 'react';
import { Search, Plus, User, Mail, X } from 'lucide-react';

// Destek talebi durumları
const ticketStatuses = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
} as const;

// Destek talebi durumlarının Türkçe karşılıkları
const ticketStatusLabels = {
  [ticketStatuses.OPEN]: 'Açık',
  [ticketStatuses.IN_PROGRESS]: 'İşlemde',
  [ticketStatuses.RESOLVED]: 'Çözüldü',
  [ticketStatuses.CLOSED]: 'Kapalı'
} as const;

interface Agent {
  id: number;
  name: string;
}

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
}

interface Customer {
  name: string;
  email: string;
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: Agent | null;
  customer: Customer;
  messages: Message[];
}

type TicketStatus = typeof ticketStatuses[keyof typeof ticketStatuses];

// Örnek destek talepleri
const tickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Teslimat Gecikmesi',
    description: 'Siparişim 2 gündür bekleniyor',
    status: ticketStatuses.OPEN,
    priority: 'high',
    createdAt: '2024-02-19T10:30:00',
    updatedAt: '2024-02-19T10:30:00',
    assignedTo: null,
    customer: {
      name: 'Mehmet Yılmaz',
      email: 'mehmet.y@example.com'
    },
    messages: [
      {
        id: 1,
        content: 'Siparişim neden gecikiyor?',
        sender: 'customer',
        timestamp: '2024-02-19T10:30:00'
      }
    ]
  },
  {
    id: 'TKT-002',
    title: 'Yanlış Adres',
    description: 'Teslimat adresi yanlış girilmiş',
    status: ticketStatuses.IN_PROGRESS,
    priority: 'medium',
    createdAt: '2024-02-19T09:15:00',
    updatedAt: '2024-02-19T09:45:00',
    assignedTo: {
      id: 1,
      name: 'Ali Demir'
    },
    customer: {
      name: 'Ayşe Kaya',
      email: 'ayse.k@example.com'
    },
    messages: [
      {
        id: 1,
        content: 'Adresimi güncellemek istiyorum',
        sender: 'customer',
        timestamp: '2024-02-19T09:15:00'
      },
      {
        id: 2,
        content: 'Size yardımcı olabilirim',
        sender: 'agent',
        timestamp: '2024-02-19T09:45:00'
      }
    ]
  }
];

// Sık sorulan sorular
const faqs = [
  {
    question: 'Teslimat süreleri ne kadar?',
    answer: 'Teslimatlar genellikle şehir içi 1-2 saat, şehirler arası 1-2 gün içinde yapılmaktadır.'
  },
  {
    question: 'Ödeme yöntemleri nelerdir?',
    answer: 'Nakit, kredi kartı ve havale/EFT ile ödeme yapılabilir.'
  },
  {
    question: 'Kargo takibi nasıl yapılır?',
    answer: 'Siparişinizin durumunu web sitemizden veya mobil uygulamamızdan takip edebilirsiniz.'
  }
];

export default function Support() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets' veya 'faq'

  // Destek talebi durumuna göre stil belirleme
  const getStatusStyle = (status: TicketStatus) => {
    const styles = {
      [ticketStatuses.OPEN]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      [ticketStatuses.IN_PROGRESS]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      [ticketStatuses.RESOLVED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      [ticketStatuses.CLOSED]: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    };
    return styles[status];
  };

  return (
    <div className="space-y-6">
      {/* Üst Başlık */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Destek</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Destek taleplerini görüntüle ve yönet</p>
        </div>
        <button 
          onClick={() => setShowNewTicketModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Yeni Talep
        </button>
      </div>

      {/* Sekmeler */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tickets'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Destek Talepleri
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'faq'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Sık Sorulan Sorular
          </button>
        </nav>
      </div>

      {activeTab === 'tickets' ? (
        <>
          {/* Filtreleme */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Talep ID veya konu ile ara..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Tüm Durumlar</option>
                {Object.entries(ticketStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Destek Talepleri Listesi */}
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">{ticket.id}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(ticket.status)}`}>
                        {ticketStatusLabels[ticket.status]}
                      </span>
                      {ticket.priority === 'high' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          Yüksek Öncelik
                        </span>
                      )}
                    </div>
                    <h4 className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                      {ticket.title}
                    </h4>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                    {new Date(ticket.createdAt).toLocaleString('tr-TR')}
                  </div>
                </div>

                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {ticket.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {ticket.customer.name}
                    </span>
                  </div>
                  {ticket.assignedTo && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Atanan: {ticket.assignedTo.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // SSS Bölümü
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Yeni Destek Talebi Modal'ı */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Yeni Destek Talebi
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Konu
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Destek talebinizin konusu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Açıklama
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Sorununuzu detaylı bir şekilde açıklayın"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Öncelik
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="low">Düşük</option>
                  <option value="medium">Orta</option>
                  <option value="high">Yüksek</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setShowNewTicketModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                İptal
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Destek Talebi Detay Modal'ı */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedTicket.id}
                  </h2>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusStyle(selectedTicket.status)}`}>
                    {ticketStatusLabels[selectedTicket.status]}
                  </span>
                </div>
                <h3 className="mt-1 text-lg text-gray-900 dark:text-white">
                  {selectedTicket.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <span className="sr-only">Kapat</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Müşteri Bilgileri</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{selectedTicket.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{selectedTicket.customer.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Mesajlar</h4>
                <div className="mt-2 space-y-4">
                  {selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${
                        message.sender === 'customer' ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-lg ${
                        message.sender === 'customer'
                          ? 'bg-gray-100 dark:bg-gray-700'
                          : 'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        <p className="text-sm text-gray-900 dark:text-white">{message.content}</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {new Date(message.timestamp).toLocaleString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Yanıt Yaz
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Mesajınızı yazın..."
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Yanıt Gönder
              </button>
              <button className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Talebi Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 