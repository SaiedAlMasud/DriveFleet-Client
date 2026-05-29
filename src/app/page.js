import Banner from './components/Banner';
import FeaturedSection from './components/FeaturedSection';
import WhyUs from './components/WhyUs';
import HowItWorks from './components/HowItWorks';

export default function RootPage() {
  // redirect('/Home');
  return (
    <div>
      <Banner />
      <FeaturedSection />
      <WhyUs />
      <HowItWorks />
    </div>
  );
}