import { createFileRoute } from '@tanstack/react-router';
import { BrandLayout } from '../components/layout/BrandLayout';
import { AnimatePresence } from 'motion/react';
import { Preloader } from '../components/common/Preloader';
import { useState } from 'react';
import GoodMorningProject from '../components/projects/good_morning/GoodMorningProject';

export const Route = createFileRoute('/goodmorning')({
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
          <GoodMorningProject />
        )}
      </AnimatePresence>
    </BrandLayout>
  );
}
