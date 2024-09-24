"use client"

import { useState } from 'react'
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import MainLayout from '@/layouts/main';
import { useProduct } from '@/hooks/useProductDetail';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  // Lấy tham số từ URL
  const params = useParams();
  const id = params.id;

  // Kiểm tra xem id có phải là chuỗi không
  if (typeof id !== 'string') {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Invalid product ID.</p>
        </div>
      </MainLayout>
    );
  }

  // Sử dụng hook với id đảm bảo là chuỗi
  const { product, loading, error } = useProduct(id);
  console.log(product)
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  // Xử lý khi sản phẩm đang được tải hoặc có lỗi
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Product not found.</p>
        </div>
      </MainLayout>
    );
  }

  // Các handler và phần còn lại của component...

  const handleImageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    } else {
      setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(Number(e.target.value), 1), product.stock);
    setQuantity(value);
  }

  const addToCart = () => {
    // Thêm sản phẩm vào giỏ hàng
    console.log(`Added ${quantity} of ${product.productName} to cart.`);
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <main className="container mx-auto mt-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative grid place-items-center">
              <img
                src={product.images[currentImage]}
                alt={`${product.productName} - Image ${currentImage + 1}`}
                className="w-[300px] h-auto rounded-lg shadow-md"
              />
              {/* Previous Button */}
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2"
                onClick={() => handleImageChange('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {/* Next Button */}
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2"
                onClick={() => handleImageChange('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              {/* Image Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-blue-600' : 'bg-gray-300'}`}
                    onClick={() => setCurrentImage(index)}
                  />
                ))}
              </div>
            </div>



            {/* Product Information */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(Number(product.rating)) ? 'text-yellow-400' : 'text-gray-300'}`}
                    />


                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-2xl font-bold mb-4">{product.price.toLocaleString('vi-VN')}₫</p>
              <p className="mb-6">{product.description}</p>
              <div className="flex items-center mb-6">
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 mr-4 border border-gray-300 rounded px-2 py-1"
                />
                <button
                  className="bg-blue-600 text-white hover:bg-blue-700 flex items-center px-4 py-2 rounded"
                  onClick={addToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </button>
                <button className="ml-4 border border-gray-300 rounded p-2 hover:bg-gray-100">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="ml-2 border border-gray-300 rounded p-2 hover:bg-gray-100">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
              {product.stock > 0 && (
                <span className="bg-green-600 text-white px-2 py-1 rounded mb-4 inline-block">In Stock</span>
              )}
              <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>

              <p className="text-sm text-gray-600 mb-4">Category
                : {product.category
                }</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            {/* Tab List */}
            <div className="flex border-b">
              {['details', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm focus:outline-none ${activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600'
                    }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'details' && 'Thông tin sản phẩm'}
                  {tab === 'reviews' && 'Đánh giá của khách hàng'}
                  {tab === 'shipping' && 'Vận chuyển & Đổi trả'}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="mt-4">

              {activeTab === 'details' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Features</h2>
                  <ul className="list-none pl-0">
                    {product && Array.isArray(product.features) && product.features.map((feature, index) => (
                      <li key={index} className="mb-2 flex items-center">
                        <Check className="h-5 w-5 text-green-600 mr-2" />
                        {feature}
                      </li>
                    ))}

                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">Great coffee!</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">By John Doe on May 1, 2023</p>
                      <p>This coffee is amazing! Rich flavor and perfect for my morning espresso.</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                  <p className="mb-4">
                    We offer free shipping on all orders over 1,000,000₫. Standard shipping typically takes 3-5
                    business days.
                  </p>
                  <h2 className="text-xl font-bold mb-4">Returns Policy</h2>
                  <p>
                    If you're not satisfied with your purchase, you can return it within 30 days for a full refund.
                    Please note that the product must be unopened and in its original packaging.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={`/placeholder.svg?height=200&width=200&text=Related+${index + 1}`}
                    alt={`Related Product ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Related Coffee Product {index + 1}</h3>
                    <p className="text-blue-600 font-bold">299,000₫</p>
                    <button className="mt-2 w-full border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  )
}
