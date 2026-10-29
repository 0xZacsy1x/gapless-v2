import type { Metadata } from 'next';
import { auth } from '@/auth';
import { Navbar } from '@/components/Navbar';
import { getProSubscription } from '@/lib/payment_service';
import { PricingClient } from './PricingClient';

export const metadata: Metadata = {
  title: 'Harga & Paket Gapless',
  description:
    'Mulai gratis atau upgrade ke Gapless Pro Rp29.000/bulan untuk analisis skill gap mendalam, roadmap lengkap 4 fase, dan misi soft skill bulanan dengan feedback AI.',
  alternates: {
    canonical: 'https://www.gapless.id/pricing',
  },
};

export default async function PricingPage() {
  const session = await auth();
  const subStatus = session?.user?.id ? await getProSubscription(session.user.id) : { isPro: false, periodEnd: null, daysRemaining: 0 };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 pb-24">
        <PricingClient
          isLoggedIn={Boolean(session?.user)}
          isPro={subStatus.isPro}
          periodEnd={subStatus.periodEnd ? subStatus.periodEnd.toISOString() : null}
          daysRemaining={subStatus.daysRemaining}
        />
      </main>
    </div>
  );
}
