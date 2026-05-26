import CarCard from '@/app/components/CarCard';


const FeaturedSection = async () => {
    const cars = await fetch('http://localhost:3000/cars').then(res => res.json());
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default FeaturedSection;