export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Gapless',
    url: 'https://www.gapless.id',
    description:
      'Platform konseling karier dan analisis skill gap berbasis AI untuk mahasiswa Indonesia',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    inLanguage: 'id',
    audience: {
      '@type': 'Audience',
      audienceType: 'Mahasiswa Indonesia',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
      description: 'Gratis untuk fitur dasar asesmen karier',
    },
    provider: {
      '@type': 'Organization',
      name: 'Gapless',
      url: 'https://www.gapless.id',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
