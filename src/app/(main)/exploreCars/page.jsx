import ExploreCarClient from './ExploreCarClient';

async function getCars() {
    try {
        const res = await fetch('http://localhost:3000/cars', {
            cache: 'no-store',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching cars:', error);
        return [];
    }
}

export default async function ExploreCarPage() {
    const cars = await getCars();
    
    return <ExploreCarClient initialCars={cars} />;
}