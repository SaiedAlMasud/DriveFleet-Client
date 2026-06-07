"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Description, FieldError, Form, Input, Label, TextField, Select, ListBox } from "@heroui/react";
import { authClient } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';

const AddCarPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const carData = {
            carName: formData.get('carName'),
            dailyRentPrice: Number(formData.get('dailyRentPrice')),
            carType: formData.get('carType'),
            imageURL: formData.get('imageURL'),
            seatCapacity: Number(formData.get('seatCapacity')),
            pickupLocation: formData.get('pickupLocation'),
            description: formData.get('description'),
            availability: formData.get('availability') === 'true',
            available: formData.get('availability') === 'true',
            createdAt: new Date(),
        };

        // Get current user session
        const { data: session } = await authClient.getSession();
        
        if (!session?.user) {
            toast.error('Please login to add a car');
            router.push('/login');
            setIsLoading(false);
            return;
        }

        // Add owner information
        carData.owner = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
        };

        const tokenData =await authClient.token();
        try {
            const response = await fetch('http://localhost:5000/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenData.token}`,
                },
                body: JSON.stringify(carData),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Car added successfully!');
                // Reset form
                e.target.reset();
                // Redirect to explore cars page after 2 seconds
                setTimeout(() => {
                    router.push('/exploreCars');
                }, 2000);
            } else {
                const error = await response.json();
                toast.error(error.message || 'Failed to add car');
            }
        } catch (error) {
            console.error('Error adding car:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
                <div className="text-center mb-8 pt-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3">
                        Add Your Car
                    </h2>
                    <p className="text-xl text-gray-600">
                        List your vehicle on DriveFleet and start earning
                    </p>
                </div>
                <Form 
                    className="flex w-full max-w-4xl flex-col gap-6 mx-auto my-10 p-4 sm:p-8 border border-gray-300 rounded-lg shadow-lg" 
                    onSubmit={handleSubmit}
                >
                    
                    {/* Car Name */}
                    <TextField isRequired name="carName" type="text">
                        <Label className="text-[20px]">Car Name</Label>
                        <Input placeholder="e.g Tesla Model S" size="xl" className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300" />
                        <FieldError />
                    </TextField>

                    {/* Grid - 1 column on sm, 2 columns on md and lg */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        {/* Daily Rental Price */}
                        <TextField isRequired name="dailyRentPrice" type="number">
                            <Label className="text-[20px]">Daily Rent Price</Label>
                            <Input placeholder="e.g. 50" size="xl" className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300" />
                            <FieldError />
                        </TextField>

                        {/* Car Type Dropdown */}
                        <Select isRequired name="carType" className="w-full placeholder:text-[20px]" placeholder="Select car type" size="2xl">
                            <Label className="text-[20px]">Car Type</Label>
                            <Select.Trigger className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="SUV" textValue="SUV" className="text-[18px]">
                                        SUV
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Sedan" textValue="Sedan" className="text-[18px]">
                                        Sedan
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Hatchback" textValue="Hatchback" className="text-[18px]">
                                        Hatchback
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="Luxury" textValue="Luxury" className="text-[18px]">
                                        Luxury
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Image URL */}
                    <TextField isRequired name="imageURL" type="text">
                        <Label className="text-[20px]">Image URL</Label>
                        <Input placeholder="Enter the image URL (imgbb/postimage)" size="lg" className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300" />
                        <FieldError />
                    </TextField>

                    {/* Grid - 1 column on sm, 2 columns on md and lg */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        {/* Seat Capacity */}
                        <TextField isRequired name="seatCapacity" type="number">
                            <Label className="text-[20px]">Seat Capacity</Label>
                            <Input placeholder="Enter the seat capacity" size="lg" className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300" />
                            <FieldError />
                        </TextField>

                        {/* Pickup Location */}
                        <TextField isRequired name="pickupLocation" type="text">
                            <Label className="text-[20px]">Pickup Location</Label>
                            <Input placeholder="Enter the pickup location" size="lg" className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300" />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Description */}
                    <TextField isRequired name="description" type="text">
                        <Label className="text-[20px]">Description</Label>
                        <Input 
                            className="h-32 placeholder:text-[20px] hover:border hover:border-gray-300"
                            placeholder="Describe your car's features, condition and what makes it special" 
                            size="lg" 
                        />
                        <FieldError />
                    </TextField>

                    {/* Availability Status */}
                    <Select isRequired name="availability" className="w-full placeholder:text-[20px]" placeholder="Select availability status" size="2xl" defaultSelectedKeys={["true"]}>
                        <Label className="text-[20px]">Availability Status</Label>
                        <Select.Trigger className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="true" textValue="Available" className="text-[18px]">
                                    Available
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="false" textValue="Not Available" className="text-[18px]">
                                    Not Available
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <Button 
                            type="submit" 
                            size="lg" 
                            color="primary" 
                            className="text-[20px] w-full sm:w-auto"
                            isLoading={isLoading}
                        >
                            {isLoading ? "Adding Car..." : "Submit"}
                        </Button>
                        <Button type="reset" variant="bordered" size="lg" className="text-[20px] hover:bg-gray-300 w-full sm:w-auto">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddCarPage;