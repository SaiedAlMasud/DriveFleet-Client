'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, FieldError, Form, Input, Label, TextField, Select, ListBox } from "@heroui/react";
import toast from 'react-hot-toast';
import { authClient } from '@/app/lib/auth-client';

export default function UpdateCarPage({ params }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [car, setCar] = useState(null);
    const [carId, setCarId] = useState(null);

    // First, get the id from params
    useEffect(() => {
        const getParams = async () => {
            const resolvedParams = await params;
            setCarId(resolvedParams.id);
        };
        getParams();
    }, [params]);

    // Then fetch car data when id is available
    useEffect(() => {
        if (carId) {
            fetchCar();
        }
    }, [carId]);

    const fetchCar = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setCar(data);
        } catch (error) {
            console.error('Error fetching car:', error);
            toast.error('Failed to load car details');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const updatedCar = {
        carName: formData.get('carName'),
        dailyRentPrice: Number(formData.get('dailyRentPrice')),
        carType: formData.get('carType'),
        imageURL: formData.get('imageURL'),
        seatCapacity: Number(formData.get('seatCapacity')),
        pickupLocation: formData.get('pickupLocation'),
        description: formData.get('description'),
        availability: formData.get('availabile') === 'true',
    };

    try {
        const tokenData = await authClient.token();
        const token = tokenData?.data?.token;

        if (!token) {
            toast.error('Please login again');
            return;
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify(updatedCar),
            }
        );

        if (response.ok) {
            toast.success('Car updated successfully!');
            router.push('/my-added-cars');
        } else {
            const error = await response.json();
            toast.error(error.message || 'Failed to update car');
        }
    } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
    } finally {
        setIsLoading(false);
    }
};

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!car) return null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="flex-grow">
                <div className="text-center mb-8 pt-8">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3">
                        Update Your Car
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
                        Edit your vehicle information
                    </p>
                </div>
                
                <Form 
                    className="flex w-full max-w-4xl flex-col gap-6 mx-auto my-10 p-6 sm:p-8 border border-gray-300 rounded-lg shadow-lg bg-white" 
                    onSubmit={handleUpdate}
                >
                    {/* Car Name */}
                    <TextField isRequired name="carName" type="text" defaultValue={car.carName}>
                        <Label className="text-lg md:text-xl lg:text-2xl font-semibold">Car Name</Label>
                        <Input size="lg" className="text-lg md:text-xl lg:text-2xl h-14 hover:border hover:border-gray-300" />
                        <FieldError />
                    </TextField>

                    {/* Grid - 1 column on sm, 2 columns on md and lg */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        {/* Daily Rental Price */}
                        <TextField isRequired name="dailyRentPrice" type="number" defaultValue={car.dailyRentPrice}>
                            <Label className="text-lg md:text-xl lg:text-2xl font-semibold">Daily Rent Price</Label>
                            <Input size="lg" className="text-lg md:text-xl lg:text-2xl h-14 hover:border hover:border-gray-300" />
                            <FieldError />
                        </TextField>

                        {/* Car Type Dropdown */}
                        <Select 
                            isRequired 
                            name="carType" 
                            className="w-full" 
                            placeholder="Select car type" 
                            size="lg"
                            defaultSelectedKeys={[car.carType]}
                        >
                            <Label className="text-lg md:text-xl lg:text-2xl font-semibold">Car Type</Label>
                            <Select.Trigger className="h-14 text-lg md:text-xl hover:border hover:border-gray-300">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="SUV" textValue="SUV" className="text-lg md:text-xl">SUV</ListBox.Item>
                                    <ListBox.Item id="Sedan" textValue="Sedan" className="text-lg md:text-xl">Sedan</ListBox.Item>
                                    <ListBox.Item id="Hatchback" textValue="Hatchback" className="text-lg md:text-xl">Hatchback</ListBox.Item>
                                    <ListBox.Item id="Luxury" textValue="Luxury" className="text-lg md:text-xl">Luxury</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Image URL */}
                    <TextField isRequired name="imageURL" type="text" defaultValue={car.imageURL}>
                        <Label className="text-lg md:text-xl lg:text-2xl font-semibold">Image URL</Label>
                        <Input size="lg" className="text-lg md:text-xl lg:text-2xl h-14 hover:border hover:border-gray-300" />
                        <FieldError />
                    </TextField>

                    {/* Grid - 1 column on sm, 2 columns on md and lg */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        {/* Seat Capacity */}
                        <TextField isRequired name="seatCapacity" type="number" defaultValue={car.seatCapacity}>
                            <Label className="text-lg md:text-xl lg:text-2xl font-semibold">Seat Capacity</Label>
                            <Input size="lg" className="text-lg md:text-xl lg:text-2xl h-14 hover:border hover:border-gray-300" />
                            <FieldError />
                        </TextField>

                        {/* Pickup Location */}
                        <TextField isRequired name="pickupLocation" type="text" defaultValue={car.pickupLocation}>
                            <Label className="text-lg md:text-xl lg:text-2xl font-semibold">Pickup Location</Label>
                            <Input size="lg" className="text-lg md:text-xl lg:text-2xl h-14 hover:border hover:border-gray-300" />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Description */}
                    <TextField isRequired name="description" type="text" defaultValue={car.description}>
                        <Label className="text-lg md:text-xl lg:text-2xl font-semibold">Description</Label>
                        <Input 
                            className="h-36 text-lg md:text-xl hover:border hover:border-gray-300" 
                            size="lg" 
                        />
                        <FieldError />
                    </TextField>

                    {/* Availability Status */}
                    <Select 
                        isRequired 
                        name="availability" 
                        className="w-full" 
                        placeholder="Select availability status" 
                        size="lg"
                        defaultSelectedKeys={[String(car.availability !== false)]}
                    >
                        <Label className="text-lg md:text-xl lg:text-2xl font-semibold">Availability Status</Label>
                        <Select.Trigger className="h-14 text-lg md:text-xl hover:border hover:border-gray-300">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="true" textValue="Available" className="text-lg md:text-2xl">Available</ListBox.Item>
                                <ListBox.Item id="false" textValue="Not Available" className="text-lg md:text-2xl">Not Available</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Button 
                            type="submit" 
                            size="lg" 
                            color="primary" 
                            className="text-lg md:text-xl font-semibold py-3 px-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                            isLoading={isLoading}
                        >
                            Update Car
                        </Button>
                        <Button 
                            type="button" 
                            variant="bordered" 
                            size="lg" 
                            className="text-lg md:text-xl font-semibold py-3 px-6 w-full sm:w-auto border-gray-400 hover:bg-gray-100"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}