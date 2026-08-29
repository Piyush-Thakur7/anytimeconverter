'use client';

import dynamic from 'next/dynamic';
import ToolPlaceholder from '@/components/ToolPlaceholder';

const ImagesToPptClient = dynamic(() => import('./ImagesToPptClient'), {
  ssr: false,
  loading: () => <ToolPlaceholder name="Images to PPT" />
});

export default function ImagesToPptWrapper() {
  return <ImagesToPptClient />;
}
