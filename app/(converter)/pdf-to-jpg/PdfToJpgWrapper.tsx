'use client';

import dynamic from 'next/dynamic';
import ToolPlaceholder from '@/components/ToolPlaceholder';

const PdfToJpgClient = dynamic(() => import('./PdfToJpgClient'), {
  ssr: false,
  loading: () => <ToolPlaceholder name="PDF to JPG" />
});

export default function PdfToJpgWrapper() {
  return <PdfToJpgClient />;
}
