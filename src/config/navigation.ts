export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', label: 'Beranda' },
  { href: '/roadmap', label: 'Roadmap Belajar' },
  { href: '/results', label: 'Hasil Saya' },
  { href: '/pricing', label: 'Harga' },
] as const;
