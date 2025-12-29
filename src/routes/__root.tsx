import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ThemeProvider } from '../context/ThemeContext';

const RootLayout = () => (
  <ThemeProvider>
    <Outlet />
    <TanStackRouterDevtools />
  </ThemeProvider>
);

export const Route = createRootRoute({ component: RootLayout });
