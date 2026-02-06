import { createFileRoute } from '@tanstack/react-router';
import { BrandLayout } from '../components/layout/BrandLayout';
import { AnimatePresence } from 'motion/react';
import { Preloader } from '../components/common/Preloader';
import { useState } from 'react';
import RoseDayGift from '../components/projects/roseday/RosedayProject';

export const Route = createFileRoute('/roseday')({
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
          <RoseDayGift />
        )}
      </AnimatePresence>
    </BrandLayout>
  );
}
