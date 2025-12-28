import { useState } from 'react';
import { BrandLayout } from './components/layout/BrandLayout';
import { Preloader } from './components/common/Preloader';
import { AnimatePresence } from 'motion/react';
import Newyear from './components/projects/new_year/NewYear';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <BrandLayout>
        <AnimatePresence mode="wait">
          {loading ? (
            <Preloader key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <Newyear />
          )}
        </AnimatePresence>
      </BrandLayout>
    </ThemeProvider>
  );
}

export default App;
