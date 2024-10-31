"use client"
import React, { useEffect } from 'react';
import { useOrder } from '@/hooks/useOrder';
import MainLayout from '@/layouts/main';
import { Loading } from '@/app/components/ui/Loading';
import { OrderItem } from '@/app/components/ui/OrderItem';



const OrderHistoryPage: React.FC = () => {
  const { orders, getOrderHistory, loading, error } = useOrder();
 console.log(orders)
  useEffect(() => {
    getOrderHistory();
  }, [getOrderHistory]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center bg-background items-center h-[calc(100vh-64px)]">
          <Loading/>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-background">
          <div className="text-center text-red-500 p-6 bg-red-50 rounded-lg shadow-md max-w-md">
            <p className="font-semibold">Đã xảy ra lỗi khi tải lịch sử đơn hàng.</p>
            <p className="mt-2">Vui lòng thử lại sau.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className=" mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-background">
        <h1 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2 ">Lịch sử đơn hàng</h1>
        {orders && orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-xl text-gray-600">
              Bạn chưa có đơn hàng nào.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default OrderHistoryPage;
