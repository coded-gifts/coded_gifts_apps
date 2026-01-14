import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Preloader } from '../components/common/Preloader';
import WeddingCardProject from '../components/projects/wedding_card/WeddingCardProject';

export const Route = createFileRoute('/weddingcard')({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Preloader key="loader" onComplete={() => setLoading(false)} />
      ) : (
        <WeddingCardProject />
      )}
    </AnimatePresence>
  );
}
