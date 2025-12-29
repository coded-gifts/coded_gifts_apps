import { createFileRoute } from '@tanstack/react-router';
import HomeLayout from '../components/layout/HomeLayout';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <HomeLayout />;
}
