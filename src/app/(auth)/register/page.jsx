'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    Card
} from "@heroui/react";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaCamera } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signUp } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const registerData = Object.fromEntries(formData.entries());

        try {
            const { error } = await signUp.email({
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
                image: registerData.photoURL || undefined,
                callbackURL: "/",
            });

            if (error) {
                const message = error.message || "Registration failed";
                setError(message);
                toast.error(message);
                return;
            }

            toast.success("Account created successfully");
            router.push("/");
        } catch (error) {
            const message = error?.message || "Something went wrong. Please try again.";
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            // Mock Google login - Replace with actual Google OAuth
            const mockGoogleUser = {
                email: 'google@user.com',
                name: 'Google User',
                photoURL: 'https://ui-avatars.com/api/?name=Google+User&background=blue&color=white'
            };

            const response = await fetch('http://localhost:5000/auth/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mockGoogleUser),
            });

            if (response.ok) {
                alert('Google login successful!');
                router.push('/');
            } else {
                setError('Google login failed');
            }
        } catch (error) {
            setError('Something went wrong with Google login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl my-12 mx-auto min-h-screen flex items-center justify-center">
            <Card className="border border-gray-200 mx-auto shadow-2xl space-y-5 p-8 md:p-10">
                {/* Header */}
                <div className="flex flex-col gap-2 pt-2 pb-6">
                    <h2 className="text-5xl font-bold text-gray-900 text-center">
                        DriveFleet
                    </h2>
                    <h1 className="text-3xl font-bold text-gray-800 text-center mt-4">
                        Create Account
                    </h1>
                    <p className="text-base text-gray-500 text-center">
                        Join DriveFleet and start your journey
                    </p>
                </div>

                <div>
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600 text-center">{error}</p>
                        </div>
                    )}

                    <Form className="flex w-96 mx-auto flex-col gap-6" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <TextField
                            isRequired
                            name="name"
                            type="text"
                            validate={(value) => {
                                if (value.length < 2) {
                                    return "Name must be at least 2 characters";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-gray-700 text-xl">Name</Label>
                            <Input
                                placeholder="Enter your full name"
                                startContent={<FaUser className="text-gray-400" />}
                                className="text-gray-700 text-xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Email Field */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-gray-700 text-xl">Email</Label>
                            <Input
                                placeholder="Enter your email"
                                startContent={<FaEnvelope className="text-gray-400" />}
                                className="text-gray-700 text-xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Photo URL Field */}
                        <TextField
                            name="photoURL"
                            type="url"
                        >
                            <Label className="text-gray-700 text-xl">Photo URL</Label>
                            <Input
                                placeholder="https://example.com/your-photo.jpg"
                                startContent={<FaCamera className="text-gray-400" />}
                                className="text-gray-700 text-xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Password Field */}
                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 6) {
                                    return "Password must be at least 6 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[a-z]/.test(value)) {
                                    return "Password must contain at least one lowercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-gray-700 text-xl">Password</Label>
                            <Input
                                placeholder="Create a password"
                                startContent={<FaLock className="text-gray-400" />}
                                className="text-gray-700 text-xl"
                            />
                            <Description>Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number</Description>
                            <FieldError />
                        </TextField>

                        {/* Register Button */}
                        {/* Register Button */}
                        <div className="text-2xl">
                            <Button
                                type="submit"
                                color="primary"
                                size="lg"
                                isLoading={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold mt-2"
                            >
                                {!isLoading ? "Sign Up" : "Creating Account..."}
                            </Button>
                        </div>
                    </Form>
                </div>

                {/* Divider */}
                <div className="relative my-6 space-y-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-white text-md text-gray-500 my-5">Or continue with</span>
                    </div>
                </div>

                {/* Google Login Button */}
                <Button
                    variant="bordered"
                    size="lg"
                    onClick={handleGoogleLogin}
                    isLoading={isLoading}
                    className="w-full border border-gray-300 hover:bg-gray-300"
                    startContent={<FaGoogle className="text-red-500" />}
                >
                    <FcGoogle />
                    Sign up with Google
                </Button>

                {/* Login Link */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}
