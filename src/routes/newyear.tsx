import { createFileRoute } from '@tanstack/react-router';
import NewYearProject from '../components/projects/new_year/NewYear';
import { BrandLayout } from '../components/layout/BrandLayout';
import { AnimatePresence } from 'motion/react';
import { Preloader } from '../components/common/Preloader';
import { useState } from 'react';

export const Route = createFileRoute('/newyear')({
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
          <NewYearProject />
        )}
      </AnimatePresence>
    </BrandLayout>
  );
}
