import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { Preloader } from '../components/common/Preloader';
import ForeverProject from '../components/projects/forver/ForeverProject';
import { useState } from 'react';
import { BrandLayout } from '../components/layout/BrandLayout';

export const Route = createFileRoute('/forever')({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = useState(true);

  return (
    <BrandLayout>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <ForeverProject />
        )}
      </AnimatePresence>
    </BrandLayout>
  );
}
