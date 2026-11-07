import type { Metadata, Viewport } from 'next';
import { Figtree, Fraunces } from 'next/font/google';
import { ContactDock } from '@/components/ContactDock';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/ui';
import { site } from '@/content/site';
import './globals.css';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', axes: ['opsz'], display: 'swap' });
const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} | Insurance and Mutual Funds in Jalandhar`,
    template: `%s | ${site.name}, Jalandhar`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: site.legalName,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.legalName}, ${site.tagline}` }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export const viewport: Viewport = { themeColor: '#f7f5ee', width: 'device-width', initialScale: 1 };

const agency = {
  '@context': 'https://schema.org',
  '@type': ['InsuranceAgency', 'FinancialService'],
  name: site.legalName,
  url: site.url,
  image: new URL('/og.png', site.url).toString(),
  logo: new URL('/brand/logo-full.webp', site.url).toString(),
  telephone: site.phone.e164,
  slogan: site.tagline,
  description: site.description,
  founder: { '@type': 'Person', name: site.advisor.name },
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    ...(site.address.postcode ? { postalCode: site.address.postcode } : {}),
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'City', name: 'Jalandhar' },
  ...(site.email ? { email: site.email } : {}),
  ...(Object.values(site.social).some(Boolean) ? { sameAs: Object.values(site.social).filter(Boolean) } : {}),
  hasMap: site.address.mapListingUrl,
  geo: { '@type': 'GeoCoordinates', latitude: site.address.latitude, longitude: site.address.longitude },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <JsonLd data={agency} />
        {/* Shield shape shared by the hero photo and other brand elements. */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <clipPath id="shield-clip" clipPathUnits="objectBoundingBox">
              <path d="M.5 0C.61.055.79.095 1 .105 1 .5.93.82.5 1 .07.82 0 .5 0 .105.21.095.39.055.5 0Z" />
            </clipPath>
          </defs>
        </svg>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ContactDock />
      </body>
    </html>
  );
}
