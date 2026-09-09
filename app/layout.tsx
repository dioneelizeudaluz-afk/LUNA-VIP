import './globals.css';

export const metadata = {
  title: 'LUNA VIP',
  description: 'Painel administrativo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0a0a0f] text-white antialiased">{children}</body>
    </html>
  );
}