'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    Button,
    Card,
    Input,
    Label,
    TextField,
    Form
} from "@heroui/react";
import { FaUser, FaEnvelope, FaCamera, FaArrowLeft, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { authClient } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: ''
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: session } = await authClient.getSession();
                if (session?.user) {
                    setUser(session.user);
                    setFormData({
                        name: session.user.name || '',
                        email: session.user.email || '',
                        image: session.user.image || ''
                    });
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error getting session:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update user profile using Better Auth
            const response = await authClient.updateUser({
                name: formData.name,
                image: formData.image,
            });

            if (response.error) {
                toast.error(response.error.message || 'Failed to update profile');
            } else {
                setUser(prev => ({ ...prev, ...formData }));
                setIsEditing(false);
                toast.success('Profile updated successfully!');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            image: user?.image || ''
        });
        setIsEditing(false);
    };

    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    <span className="font-medium">Back to Home</span>
                </Link>

                {/* Profile Card */}
                <Card className="border border-gray-200 shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-8 text-center">
                        <div className="w-full flex justify-center">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                />
                            ) : (
                                <div className="bg-white flex items-center justify-center border-4 border-white shadow-lg rounded-md"
                                    style={{ width: '80%', maxWidth: '450px', height: '80%', aspectRatio: '1/1' }}>
                                    <FaUser className="w-1/3 h-1/3 text-blue-600" />
                                </div>
                            )}
                        </div>
                        <h1 className="text-3xl font-bold text-black mt-4">
                            {user.name}
                        </h1>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        {!isEditing ? (
                            // View Mode
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-3xl font-bold text-gray-900">Profile Information</h2>
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-blue-600 text-lg hover:bg-blue-700 text-white"
                                        startContent={<FaEdit />}
                                    >
                                        Edit Profile
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <div className="border-b border-gray-400 pb-4 space-y-2">
                                        <p className="text-lg text-gray-500">Full Name</p>
                                        <p className="text-xl font-semibold text-gray-900">{user.name}</p>
                                    </div>
                                    <div className="border-b border-gray-400 pb-4 space-y-2">
                                        <p className="text-lg text-gray-500">Email Address</p>
                                        <p className="text-xl font-semibold text-gray-900">{user.email}</p>
                                    </div>
                                    {user.image && (
                                        <div className="border-b border-gray-400 pb-4">
                                            <p className="text-lg text-gray-500">Profile Picture URL</p>
                                            <p className="text-xl font-semibold text-gray-900 break-all">{user.image}</p>
                                        </div>
                                    )}
                                    <div className="border-b border-gray-400 pb-4 space-y-2">
                                        <p className="text-lg text-gray-500">Member Since</p>
                                        <p className="text-xl font-semibold text-gray-900">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Edit Mode
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
                                    <Button
                                        onClick={handleCancel}
                                        variant="bordered"
                                        className="border-red-500 text-lg text-red-500 hover:bg-blue-500 hover:text-white transition"
                                        startContent={<FaTimes />}
                                    >
                                        Cancel
                                    </Button>
                                </div>

                                <Form onSubmit={handleUpdateProfile} className="space-y-6">
                                    {/* Name Field */}
                                    <div className="space-y-2 mb-4">
                                        <Label className="text-gray-700 text-lg font-semibold mb-2 block">Full Name</Label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            startContent={<FaUser className="text-gray-400" />}
                                            size="xl"
                                            className="w-full"
                                            required
                                        />
                                    </div>

                                    {/* Email Field (Read-only) */}
                                    <div className="space-y-2 mb-4">
                                        <Label className="text-gray-700 text-lg font-semibold mb-2 block">Email Address</Label>
                                        <Input
                                            name="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full bg-gray-100"
                                            size="xl"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                                    </div>

                                    {/* Photo URL Field */}
                                    <div className="space-y-2 mb-4">
                                        <Label className="text-gray-700 text-lg font-semibold mb-2 block">Profile Picture URL</Label>
                                        <Input
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/your-photo.jpg"
                                            startContent={<FaCamera className="text-gray-400" />}
                                            size="xl"
                                            className="w-full"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex gap-3 mt-6">
                                        <Button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                                            size="lg"
                                            isLoading={loading}
                                            startContent={<FaSave />}
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    <Card className="border border-gray-200 shadow-md p-6 text-center hover:shadow-lg transition">
                        <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                        <p className="text-gray-600">Cars Rented</p>
                    </Card>
                    <Card className="border border-gray-200 shadow-md p-6 text-center hover:shadow-lg transition">
                        <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                        <p className="text-gray-600">Total Spent</p>
                    </Card>
                    <Card className="border border-gray-200 shadow-md p-6 text-center hover:shadow-lg transition">
                        <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                        <p className="text-gray-600">Active Bookings</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}