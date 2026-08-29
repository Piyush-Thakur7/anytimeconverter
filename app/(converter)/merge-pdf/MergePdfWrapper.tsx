'use client';

import dynamic from 'next/dynamic';
import ToolPlaceholder from '@/components/ToolPlaceholder';

const MergePdfClient = dynamic(() => import('./MergePdfClient'), {
  ssr: false,
  loading: () => <ToolPlaceholder name="Merge PDF" />
});

export default function MergePdfWrapper() {
  return <MergePdfClient />;
}
