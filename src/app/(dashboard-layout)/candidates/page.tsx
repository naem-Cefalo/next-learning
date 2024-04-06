import React from 'react';
import CandidatePage from './_components/CandidatePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidates',
  description: '...',
};

function Page() {
  return <CandidatePage />;
}

export default Page;
