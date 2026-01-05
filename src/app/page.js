import Hero from '@/components/home/Hero';
import MostViewed from '@/components/home/MostViewed';
import SearchFilter from '@/components/home/SearchFilter';
import ExclusiveHighlight from '@/components/home/ExclusiveHighlight';
import PremiumGallery from '@/components/home/PremiumGallery';
import FeaturedSell from '@/components/home/FeaturedSell';
import DreamHome from '@/components/home/DreamHome';
import FAQ from '@/components/home/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      {/* <SearchFilter /> Intentionally removed as it's now part of Hero */}
      <MostViewed />
      <ExclusiveHighlight />
      <PremiumGallery />
      <FeaturedSell />
      <DreamHome />
      <FAQ />
    </>
  );
}
