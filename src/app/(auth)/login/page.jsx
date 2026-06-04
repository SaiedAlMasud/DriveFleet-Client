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
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful!');
                router.push('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        alert('Google login - Coming soon!');
    };

    return (
        <div className="max-w-2xl my-12 mx-auto min-h-screen flex items-center justify-center">
            <Card className="border border-gray-200 mx-auto shadow-xl space-y-5 p-8 md:p-10">
                {/* Header */}
                <div className="flex flex-col gap-2 pt-2 pb-6">
                    <h2 className="text-5xl font-bold text-gray-900 text-center">
                        DriveFleet
                    </h2>
                    <h1 className="text-3xl font-bold text-gray-800 text-center mt-4">
                        Welcome Back
                    </h1>
                    <p className="text-base text-gray-500 text-center">
                        Sign in to your DriveFleet account
                    </p>
                </div>

                <div>
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600 text-center">{error}</p>
                        </div>
                    )}

                    <Form className="flex w-96 mx-auto flex-col gap-6" onSubmit={onSubmit}>
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
                            <Input placeholder="Enter Your Email" className="text-gray-700 text-xl" />
                            <FieldError />
                        </TextField>
                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-gray-700 text-xl">Password</Label>
                            <Input placeholder="Enter your password" className="text-gray-700 text-xl" />
                            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                            <FieldError />
                        </TextField>
                        <div className="text-2xl">
                            <Button
                                type="submit"
                                color="primary"
                                size="lg"
                                isLoading={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-base text-2xl font-semibold mt-2"
                            >
                                {!isLoading && "Sign In"}
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="relative my-6 space-y-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-white text-md text-gray-500 my-5">Or continue with</span>
                    </div>
                </div>
                    
                    <Button
                        variant="bordered"
                        size="lg"
                        onClick={handleGoogleLogin}
                        className="w-full border-gray-300  hover:bg-gray-50"
                        startContent={<FaGoogle className="text-red-500" />}
                    >
                        <FcGoogle />
                        Sign in with Google
                    </Button>
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            href="/register"
                            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}