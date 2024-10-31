"use client"

import { useState, useEffect } from 'react'
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { FaStar } from "react-icons/fa";
import MainLayout from '@/layouts/main';
import { useProduct } from '@/hooks/useProductDetail';
import { useParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/cartProvider';
import { useRouter } from 'next/navigation';
import { Loading } from '@/app/components/ui/Loading';
import Card from '@/app/components/ui/Card';
import { CardItem } from '@/types/card';
import RenderHTML from '@/app/components/RenderHTML';
// Add this dummy data somewhere at the top of your file, outside the component
const dummyReviews = [
  {
    rating: 5,
    title: "Sản phẩm tuyệt vời!",
    author: "Nguyễn Văn A",
    date: "15/05/2023",
    content: "Tôi rất hài lòng với sản phẩm này. Chất lượng tốt và giá cả phải chăng."
  },
  {
    rating: 4,
    title: "Khá ổn",
    author: "Trần Thị B",
    date: "10/05/2023",
    content: "Sản phẩm tốt, nhưng có thể cải thiện thêm về đóng gói."
  },
  {
    rating: 5,
    title: "Tuyệt vời ông mặt trời!",
    author: "Lê Văn C",
    date: "05/05/2023",
    content: "Đây là một trong những sản phẩm tốt nhất mà tôi từng mua. Rất đáng giá!"
  },
  {
    rating: 3,
    title: "Bình thường",
    author: "Phạm Thị D",
    date: "01/05/2023",
    content: "Sản phẩm ổn, nhưng không có gì đặc biệt. Có thể cải thiện thêm."
  },
  {
    rating: 5,
    title: "Rất hài lòng",
    author: "Hoàng Văn E",
    date: "25/04/2023",
    content: "Chất lượng sản phẩm vượt quá mong đợi của tôi. Sẽ mua lại!"
  },
  {
    rating: 4,
    title: "Tốt",
    author: "Đỗ Thị F",
    date: "20/04/2023",
    content: "Sản phẩm tốt, giao hàng nhanh. Chỉ có điều giá hơi cao."
  },
];

// Add interfaces for the review and product types at the top of the file
interface Review {
  rating: number;
  title: string;
  author: string;
  date: string;
  content: string;
}

export default function ProductDetail() {
  // Lấy tham số từ URL
  const params = useParams();
  const id = params.id;
  const { addToCart } = useCart();
  // Ensure id is a string before using it with the hook
  const { product, loading, error } = useProduct(id as string);
  const { products } = useProducts();
  const router = useRouter();
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product.id)
     .slice(0, 10);
   console.log(product?.rating)
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

  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [isLiked, setIsLiked] = useState(false);

  const [displayedReviews, setDisplayedReviews] = useState(5);
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);

  const handleViewMore = () => {
    setDisplayedReviews(prevCount => Math.min(prevCount + 5, reviews.length));
  };

  // Xử lý khi sản phẩm đang được tải hoặc có lỗi
  if (loading || !product) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center bg-background justify-center">
         <Loading/>
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

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        productName: product.productName,
        price: product.sales, // Using the sale price
        image: product.images[0],
        quantity: quantity,
        detailPage:product.detailPage,
        storeId:product.storeId,
        color: selectedColor,
        size: selectedSize,
      });
      console.log(`Added ${quantity} of ${product.productName} to cart.`);
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you could also implement logic to save the like status to a backend or local storage
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({

        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Share this product: ${window.location.href}`);
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <main className="container mx-auto pt-8 px-4 text-foreground">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative grid place-items-center">
              <img
                src={product.images[currentImage]}
                alt={`${product.productName} - Image ${currentImage + 1}`}
                className="w-full max-w-[300px] h-auto rounded-lg shadow-md"
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
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-bold">{product.productName}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <div>
                      <FaStar
                        key={i}
                        className={`h-5 w-5 ${i < (Number(product?.rating) ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    </div>
                  ))}
                  
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <div className='flex'>
                <p className="text-md ml-3 mt-2 line-through mb-4">{product.price.toLocaleString('vi-VN')}₫</p><span className="text-2xl font-bold mb-4">{product.sales.toLocaleString('vi-VN')}₫</span>


              </div>
              {/* Color options */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`w-5 h-5 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${selectedColor === color ? 'ring-2 ring-blue-500' : ''
                          } ${color.toLowerCase() === 'white' ? 'border border-gray-300' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size options */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-3 text-sm py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${selectedSize === size
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 hover:bg-gray-100'
                          }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p>{product.description}</p>
              <div className="flex flex-wrap items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 border border-gray-300 rounded px-2 py-1"
                />
                <button
                  className="bg-blue-600 text-white hover:bg-blue-700 flex items-center px-4 py-2 rounded"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </button>
                <button
                  className={`border border-gray-300 rounded p-2 hover:bg-gray-100 ${isLiked ? 'text-red-500' : ''}`}
                  onClick={handleLike}
                >
                  <Heart className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
                </button>
                <button
                  className="border border-gray-300 rounded p-2 hover:bg-gray-100"
                  onClick={handleShare}
                >
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
            <div className="flex flex-wrap border-b">
              {['details', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 -mb-px border-b-2 font-medium text-sm focus:outline-none ${
                    activeTab === tab
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
                  <h2 className="text-xl font-bold mb-4">Đặc trưng</h2>
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
                  <h2 className="text-xl font-bold mb-4">Tất cả đánh giá</h2>
                  {reviews.slice(0, displayedReviews).map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{review.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Bởi {review.author} vào {review.date}</p>
                      <p>{review.content}</p>
                    </div>
                  ))}
                  {displayedReviews < reviews.length && (
                    <button 
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                      onClick={handleViewMore}
                    >
                      Xem thêm
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Thông tin vận chuyển</h2>
                  <p className="mb-4">
                    Chúng tôi cung cấp miễn phí vận chuyển cho tất cả đơn hàng trên 1.000.000₫. Thời gian vận chuyển tiêu chuẩn thường mất 3-5 ngày làm việc.
                  </p>
                  <h2 className="text-xl font-bold mb-4">Chính sách đổi trả</h2>
                  <p>
                    Nếu bạn không hài lòng với sản phẩm đã mua, bạn có thể trả li trong vòng 30 ngày để được hoàn tiền đầy đủ. Xin lưu ý rằng sản phẩm phải chưa được mở và còn nguyên trong bao bì gốc.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className='mt-8'>
            {
              product.introducing ? <div>
                <h1 className='text-xl font-bold mb-4'>Giới thiệu sản phẩm</h1>
                 <RenderHTML htmlContent={product.introducing ?? ''} />
              </div>   :<div></div>
            }
          
          </div>

          {/* Related Products */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
            <div className="flex flex-wrap space-x-2">
              {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} item={relatedProduct as unknown as CardItem} />
                // <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                //   <img
                //     src={relatedProduct.images[0]}
                //     alt={relatedProduct.productName}
                //     className="w-full h-48 object-cover"
                //   />
                //   <div className="p-4">
                //     <h3 className="font-semibold text-lg mb-2">{relatedProduct.productName}</h3>
                //     <p className="text-blue-600 font-bold">{relatedProduct.price.toLocaleString('vi-VN')}₫</p>
                //     <button
                //       className="mt-2 w-full border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
                //       onClick={() => router.push(`/pages/product/${relatedProduct.id}`)}
                //     >
                //       View Details
                //     </button>
                //   </div>
                // </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </MainLayout>
  )
}
