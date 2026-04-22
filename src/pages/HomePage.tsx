import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ServicesOverview from '../components/home/ServicesOverview';
import WhyChooseUs from '../components/home/WhyChooseUs';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <ServicesOverview />
      <WhyChooseUs />
    </main>
  );
}
