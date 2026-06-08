import ExploreCarClient from './ExploreCarClient';

async function getCars(search = '', type = 'All Types') {
    try {
        // Build URL with query parameters
        const params = new URLSearchParams();
        if (search && search.trim() !== '') {
            params.append('search', search);
        }
        if (type && type !== 'All Types') {
            params.append('type', type);
        }
        
        const url = `${process.env.NEXT_PUBLIC_API_URL}/cars${params.toString() ? `?${params.toString()}` : ''}`;
        const res = await fetch(url, {
            cache: 'no-store',
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching cars:', error);
        return [];
    }
}

export default async function ExploreCarPage({ searchParams }) {
    // Get search and type from URL query parameters
    const search = (await searchParams)?.search || '';
    const type = (await searchParams)?.type || 'All Types';
    
    const cars = await getCars(search, type);
    
    return <ExploreCarClient initialCars={cars} initialSearch={search} initialType={type} />;
}