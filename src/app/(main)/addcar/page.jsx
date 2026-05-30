"use client";

import { Button, Description, FieldError, Form, Input, Label, TextField, Select, ListBox } from "@heroui/react";

const AddCarPage = () => {

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
                <Form className="flex w-full max-w-4xl flex-col gap-6 mx-auto my-10 p-8 border border-gray-300 rounded-lg shadow-lg">
                    
                    {/* Car Name */}
                    <TextField isRequired name="carName" type="text">
                        <Label className="text-[20px]">Car Name</Label>
                        <Input placeholder="e.g Tesla Model S" size="xl" className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300" />
                        <FieldError />
                    </TextField>

                    <div className="grid grid-cols-2 gap-10">
                        {/* Daily Rental Price */}
                        <TextField isRequired name="dailyRentalPrice" type="text">
                            <Label className="text-[20px]">Daily Rental Price</Label>
                            <Input placeholder="e.g. $50" size="xl" className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300" />
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
                        <Input placeholder="Enter the image URL" size="lg" className="placeholder:text-[20px] h-15 hover:border hover:border-gray-300" />
                        <FieldError />
                    </TextField>

                    <div className="grid grid-cols-2 gap-10">
                        {/* Seat Capacity */}
                        <TextField isRequired name="seatCapacity" type="text">
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

                    {/* Buttons */}
                    <div className="flex gap-2 mt-4">
                        <Button type="submit" size="lg" color="primary" className="text-[20px]">
                            Submit
                        </Button>
                        <Button type="reset" variant="bordered" size="lg" className="text-[20px] hover:bg-gray-300">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddCarPage;