import Banner from '@/app/components/Banner';
import FeaturedSection from '@/app/components/FeaturedSection';
import HowItWorks from '@/app/components/HowItWorks';
import WhyUs from '@/app/components/WhyUs';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Banner />
            <FeaturedSection />
            <WhyUs />
            <HowItWorks />
        </div>
    );
};

export default HomePage;