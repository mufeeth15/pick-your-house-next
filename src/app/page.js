import Hero from '@/components/home/Hero';
import SearchFilter from '@/components/home/SearchFilter';
import PropertyDiscovery from '@/components/home/PropertyDiscovery';
import ExclusiveHighlight from '@/components/home/ExclusiveHighlight';
import FeaturedSell from '@/components/home/FeaturedSell';
import DreamHome from '@/components/home/DreamHome';
import FAQ from '@/components/home/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      {/* <SearchFilter /> Intentionally removed as it's now part of Hero */}
      <PropertyDiscovery />
      <ExclusiveHighlight />
      <FeaturedSell />
      <DreamHome />
      <FAQ />
    </>
  );
}
