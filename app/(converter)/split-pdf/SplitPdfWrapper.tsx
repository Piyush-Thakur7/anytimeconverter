'use client';

import dynamic from 'next/dynamic';
import ToolPlaceholder from '@/components/ToolPlaceholder';

const SplitPdfClient = dynamic(() => import('./SplitPdfClient'), {
  ssr: false,
  loading: () => <ToolPlaceholder name="Split PDF" />
});

export default function SplitPdfWrapper() {
  return <SplitPdfClient />;
}
