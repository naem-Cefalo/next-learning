import React from 'react';
import CandidatePage from './_components/CandidatePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],

    locale: 'en_US',
    type: 'website',
  },
};

function Page() {
  return <CandidatePage />;
}

export default Page;
