"use client"
import { useState } from 'react'
import { ShoppingCart, Bell, Search, Star, Zap, Menu } from 'lucide-react'
import MainLayout from '@/layouts/main'
import { useProducts } from '@/hooks/useProducts'
import { Product } from '@/types/products'
import { FaStar } from "react-icons/fa";
import Link from 'next/link'
export default function Component() {

  const { products } = useProducts();
  const categories = [
    { name: 'Điện Gia Dụng', image: 'https://salt.tikicdn.com/cache/100x100/ts/category/61/d4/ea/e6ea3ffc1fcde3b6224d2bb691ea16a2.png.webp' },
    { name: 'Thời trang', image: 'https://salt.tikicdn.com/cache/100x100/ts/category/55/5b/80/48cbaafe144c25d5065786ecace86d38.png.webp' },
    { name: 'Nhà cửa & Đời sống', image: 'https://salt.tikicdn.com/cache/100x100/ts/category/f6/22/46/7e2185d2cf1bca72d5aeac385a865b2b.png.webp' },
    { name: 'Làm đẹp', image: 'https://salt.tikicdn.com/cache/100x100/ts/category/73/0e/89/bf5095601d17f9971d7a08a1ffe98a42.png.webp' },
  ];


  return (
    <MainLayout>

      <div className="min-h-screen bg-background text-foreground">


        <main className="container mx-auto pt-8  px-4">
          <section className="mb-8 md:mb-12">
            <div className="bg-accent text-foreground p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Chào mừng đến với Globimart</h2>
              <p className="text-lg md:text-xl mb-6">Khám phá các sản phẩm quốc tế cao cấp trong tầm tay bạn!</p>
              <button className="bg-primary text-primary-contrastText px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300">
                Mua sắm ngay
              </button>
            </div>
          </section>
          <section className="pb-12">
            <h2 className="text-2xl font-bold mb-6">Danh mục hot</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(({ name, image }) => (
                <div key={name} className="bg-background shadow-lg p-6 rounded-lg text-center hover:bg-white transition duration-300">
                  <img src={image} alt={name} className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold">{name}</h3>
                </div>
              ))}
            </div>
          </section>
          <section className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

              {products.map((product: Product) => (
                <Link href={`/pages/product/${product.id}`} key={product.id} className="bg-background-paper rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                  <img src={product.images[0]} alt={product.productName} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-2">{product.productName}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-foreground text-lg font-bold">{product.sales.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>{' '}
                        <span className="text-foreground-secondary line-through text-sm font-bold">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(product.star || 4)].map((_, index) => (
                          <FaStar key={index} className="h-4 w-4 text-highlight" />
                        ))}
                        <span className="ml-1">{product.star || 4}</span>
                      </div>
                    </div>
                    <span className=' text-base md:text-sm mb-2 line-clamp-2'>{product.description}</span>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="bg-secondary text-secondary-contrastText px-2 py-1 rounded-full text-xs md:text-sm">{product.category}</span>
                      <button className="bg-primary text-primary-contrastText px-3 py-1 rounded-md text-sm hover:bg-primary-dark transition duration-300">
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="pb-12">
            <div className="bg-secondary text-secondary-contrastText p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-4">Ưu đãi độc quyền</h2>
              <p className="text-xl mb-6">Đừng bỏ lỡ các ưu đãi có thời hạn của chúng tôi!</p>
              <button className="bg-accent text-foreground px-4 py-2 rounded-md hover:bg-accent-dark transition duration-300">
                Xem thêm
              </button>
            </div>
          </section>


        </main>


      </div>
    </MainLayout >

  )
}
