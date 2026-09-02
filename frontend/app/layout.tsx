import './globals.css';
import type { Metadata } from 'next';
import { AppShell } from '@/components/shell';

export const metadata: Metadata = {
  title: 'NovaPOS',
  description: 'Modern multi-store POS and inventory platform',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
