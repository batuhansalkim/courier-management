'use client';

import { Home, Package, Map, BarChart2, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: Home, label: 'Ana Sayfa', href: '/' },
  { icon: Package, label: 'Siparişler', href: '/orders' },
  { icon: Map, label: 'Rota Planı', href: '/routes' },
  { icon: BarChart2, label: 'Analitik', href: '/analytics' },
  { icon: Settings, label: 'Ayarlar', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}