"use client"
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MainLayout from '@/layouts/main'
import { useCart } from '@/contexts/cartProvider'
import Image from 'next/image' // Use Next.js Image component for optimization
import toast from 'react-hot-toast'

export default function ShoppingCart() {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading for demo purposes
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    setLoadingItems(prev => ({ ...prev, [id]: true }));
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateCartItemQuantity(id, newQuantity);
    }
    setLoadingItems(prev => ({ ...prev, [id]: false }));
  }, [updateCartItemQuantity, removeFromCart]);

  const removeItem = useCallback((id: string) => {
    setLoadingItems(prev => ({ ...prev, [id]: true }));
    removeFromCart(id);
    setLoadingItems(prev => ({ ...prev, [id]: false }));
  }, [removeFromCart]);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const shippingCost = 0;
  const total = useMemo(() => subtotal + shippingCost, [subtotal, shippingCost]);

  const handleCheckout = useCallback(async () => {
    setIsCheckingOut(true);
    try {
      await router.push('/pages/checkout');
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại sau.');
    } finally {
      setIsCheckingOut(false);
    }
  }, [router]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        <main className="container mx-auto px-4 pt-10 text-foreground">
          <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl mb-4">Your cart is empty</p>
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center py-4 border-b">
                    <Image src={item.image} alt={item.productName} width={80} height={80} className="object-cover rounded mr-4" />
                    <div className="flex-grow">
                      <h2 className="font-semibold">{item.productName}</h2>
                      <p className="text-blue-600 font-bold">{item.price.toLocaleString('vi-VN')}₫</p>
                      <div className="flex items-center mt-2">
                        <button
                          className="border border-gray-300 rounded p-1 disabled:opacity-50"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={loadingItems[item.id]}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-16 mx-2 text-center">
                          {loadingItems[item.id] ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 inline-block"></div>
                          ) : (
                            item.quantity
                          )}
                        </span>
                        <button
                          className="border border-gray-300 rounded p-1 disabled:opacity-50"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={loadingItems[item.id]}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      onClick={() => removeItem(item.id)}
                      disabled={loadingItems[item.id]}
                    >
                      {loadingItems[item.id] ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-500"></div>
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="md:col-span-1">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>
                  <div className="flex justify-between mb-2">
                    <span>Tổng</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Vận chuyển</span>
                    <span>{shippingCost.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between font-bold">
                    <span>Tổng cộng</span>
                    <span>{total.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <button 
                    className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded disabled:opacity-50 flex items-center justify-center"
                    onClick={handleCheckout}
                    disabled={isCheckingOut || cart.length === 0}
                  >
                    {isCheckingOut ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    ) : null}
                    {isCheckingOut ? 'Processing...' : 'Tiến hành đặt hàng'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  )
}
