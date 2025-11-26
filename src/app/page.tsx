import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { FeaturedEvents } from '@/components/landing/FeaturedEvents';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <FeaturedEvents />
    </div>
  );
}
