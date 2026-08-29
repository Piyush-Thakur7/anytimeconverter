'use client';

import dynamic from 'next/dynamic';
import ToolPlaceholder from '@/components/ToolPlaceholder';

const ImageConverterClient = dynamic(() => import('./ImageConverterClient'), {
  ssr: false,
  loading: () => <ToolPlaceholder name="Image Rescaler" />
});

export default function ImageConverterWrapper() {
  return <ImageConverterClient />;
}
