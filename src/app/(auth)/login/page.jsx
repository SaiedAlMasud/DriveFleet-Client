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
import { signIn } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';

export default function LoginPage() {
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
            const { error } = await signIn.email({
                email: registerData.email,
                password: registerData.password,
                callbackURL: "/",
            });

            if (error) {
                const message = error.message || "Login failed";
                setError(message);
                toast.error(message, {
                    duration: 3000
                });
                return;
            }

            toast.success("Login successfully", {
                duration: 3000
            });
            router.push("/");
        } catch (error) {
            const message = error?.message || "Something went wrong. Please try again.";
            setError(message);
            toast.error(message, {
                duration: 3000
            });
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

                    <Form className="flex w-96 mx-auto flex-col gap-6" onSubmit={handleSubmit}>
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
                                if (value.length < 6) {
                                    return "Password must be at least 6 characters";
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
                                {!isLoading ? "Sign In" : "Signing In..."}
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="relative my-3 space-y-6">

                    <div className="relative flex justify-center text-md">
                        <span className="px-3 bg-white text-md text-gray-500 my-3">Or continue with</span>
                    </div>
                </div>

                <Button
                    variant="bordered"
                    size="lg"
                    onClick={handleGoogleLogin}
                    className="w-full border-gray-300 hover:bg-gray-100"
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