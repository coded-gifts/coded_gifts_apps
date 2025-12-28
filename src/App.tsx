import { useState } from 'react';
import { BrandLayout } from './components/layout/BrandLayout';
import { Preloader } from './components/common/Preloader';
import { AnimatePresence } from 'motion/react';
import Newyear from './components/projects/new_year/NewYear';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrandLayout>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <Newyear />
        )}
      </AnimatePresence>
    </BrandLayout>
  );
}

export default App;
