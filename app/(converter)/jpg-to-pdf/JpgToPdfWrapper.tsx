'use client';

import dynamic from 'next/dynamic';
import ToolPlaceholder from '@/components/ToolPlaceholder';

const JpgToPdfClient = dynamic(() => import('./JpgToPdfClient'), {
  ssr: false,
  loading: () => <ToolPlaceholder name="JPG to PDF" />
});

export default function JpgToPdfWrapper() {
  return <JpgToPdfClient />;
}
