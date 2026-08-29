'use client';

import dynamic from 'next/dynamic';
import ToolPlaceholder from '@/components/ToolPlaceholder';

const CompressFileClient = dynamic(() => import('./CompressFileClient'), {
  ssr: false,
  loading: () => <ToolPlaceholder name="File Compressor" />
});

export default function CompressFileWrapper() {
  return <CompressFileClient />;
}
