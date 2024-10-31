"use client"
import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '@/contexts/authProvider';
import { useRouter } from 'next/navigation';

function Page() {
    const { login, loginWithGoogle } = useAuth();
    const router = useRouter();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            router.push('/'); // Chuyển hướng sau khi đăng nhập thành công
        } catch (error) {
            console.error('Login failed:', error);
            // Hiển thị thông báo lỗi cho người dùng
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await loginWithGoogle();
            router.push('/'); // Chuyển hướng sau khi đăng nhập thành công
        } catch (error) {
            console.error('Google login failed:', error);
            // Hiển thị thông báo lỗi cho người dùng
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            // await loginWithFacebook();
            // Redirect or show success message
        } catch (error) {
            console.error('Facebook login failed:', error);
            // Show error message to user
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Đăng nhập</h1>
                <form onSubmit={handleSubmit} className="space-y-4 text-foreground-secondary">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground-secondary"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Ghi nhớ tôi</label>
                        </div>
                        <a href="/auth/resetPassword" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang xử lý...
                            </>
                        ) : 'Đăng nhập'}
                    </button>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            disabled={isLoading}
                        >
                            <FaGoogle className="mr-2" /> Google
                        </button>
                        <button
                            onClick={handleFacebookLogin}
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <FaFacebook className="mr-2" /> Facebook
                        </button>
                    </div>
                </div>
                <p className="mt-8 text-center text-sm text-gray-600">
                    Chưa có tài khoản? <a href="/auth/register" className="font-medium text-blue-600 hover:underline">Đăng ký ngay</a>
                </p>
            </div>
        </div>
    );
}

export default Page;
