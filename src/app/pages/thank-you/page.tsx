"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import MainLayout from '@/layouts/main';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ThankYouPage: React.FC = () => {
  useEffect(() => {
    // Có thể thêm logic để theo dõi hoàn thành đơn hàng ở đây
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Cảm ơn bạn đã đặt hàng | Tên Cửa Hàng</title>
        <meta name="description" content="Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và sẽ được xử lý sớm." />
      </Head>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 text-center bg-background h-screen items-center"
      >
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
          <h1 className="text-3xl font-bold mb-4 text-foreground">Cảm ơn bạn đã đặt hàng!</h1>
          <p className="text-lg mb-6 text-foreground-secondary">
            Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ xử lý và giao hàng trong thời gian sớm nhất.
          </p>
          <p className="text-md mb-8 text-foreground-secondary">
            Một email xác nhận đã được gửi đến địa chỉ email của bạn với chi tiết đơn hàng.
          </p>
          <div className="space-x-4">
            <Link href={process.env.NEXT_PUBLIC_ORDER_HISTORY_URL || "/pages/order-history"} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition duration-300">
              Xem đơn hàng
            </Link>
            <Link href={process.env.NEXT_PUBLIC_HOME_URL || "/"} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg inline-block transition duration-300">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default ThankYouPage;
