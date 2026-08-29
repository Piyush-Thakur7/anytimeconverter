'use client';

import dynamic from 'next/dynamic';
import ToolPlaceholder from '@/components/ToolPlaceholder';

const WordToPdfClient = dynamic(() => import('./WordToPdfClient'), {
  ssr: false,
  loading: () => <ToolPlaceholder name="Word to PDF" />
});

export default function WordToPdfWrapper() {
  return <WordToPdfClient />;
}
