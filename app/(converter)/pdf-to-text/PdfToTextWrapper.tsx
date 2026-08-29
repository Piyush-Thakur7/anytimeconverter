'use client';

import dynamic from 'next/dynamic';
import ToolPlaceholder from '@/components/ToolPlaceholder';

const PdfToTextClient = dynamic(() => import('./PdfToTextClient'), {
  ssr: false,
  loading: () => <ToolPlaceholder name="PDF to Text" />
});

export default function PdfToTextWrapper() {
  return <PdfToTextClient />;
}
