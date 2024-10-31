"use client"

import MainLayout from '@/layouts/main'
import { useProducts } from '@/hooks/useProducts'
import { Product } from '@/types/products'
import { FaStar } from "react-icons/fa";
import Link from 'next/link'
import { useCart } from '@/contexts/cartProvider';
import { useRouter } from 'next/navigation';
import Card from './components/ui/Card';
import { CardItem } from '@/types/card';
import BannerCarousel from './components/BannerImage';
import { Loading } from './components/ui/Loading';
export default function Component() {

  const { products,loading } = useProducts();


  const quickLinks = [
    { name: 'TOP DEAL', image: 'https://salt.tikicdn.com/ts/upload/2f/52/8e/00ab5fbea9d35fcc3cadbc28d7c6b14e.png', color: 'rgb(217, 56, 67)', href: '#' },
    { name: 'Globimart Trading', image: 'https://salt.tikicdn.com/ts/upload/72/8d/23/a810d76829d245ddd87459150cb6bc77.png', href: '#' },
    { name: 'Coupon siêu hot', image: 'https://salt.tikicdn.com/ts/upload/8b/a4/9f/84d844f70e365515b6e4e3e745dac1d5.png', href: '#' },
    { name: 'Vòng Quay Tri Ân', image: 'https://salt.tikicdn.com/ts/upload/67/92/68/00aeeda190357c6c36a028b0d38c0e6e.png', href: '#' },
    { name: 'Hàng ngoại giá hot', image: 'https://salt.tikicdn.com/ts/upload/cf/46/d1/e474a9eb803909a59927600ee64ddd4f.png', href: '#' },
    { name: 'Cùng mẹ chăm bé', image: 'https://salt.tikicdn.com/cache/750x750/ts/upload/d7/b9/cf/185c3ea4d118574d7927f3d191575445.jpg', href: '#' },
    { name: 'Mọt sách Globimart', image: 'https://salt.tikicdn.com/cache/750x750/ts/upload/28/52/b2/e77e55676a38e02c5ac7242cc43f46dc.jpg', href: '#' },
    { name: 'Thế giới công nghệ', image: 'https://salt.tikicdn.com/cache/750x750/ts/upload/25/a7/1f/5538b19e95600da86e1241082fb631bf.jpg', href: '#' },
    { name: 'Yêu bếp nghiện nhà', image: 'https://salt.tikicdn.com/cache/750x750/ts/upload/03/f9/44/343e3b73c1e600e3c16b97843dc04bb1.jpg', href: '#' },
    { name: 'Khỏe đẹp toàn diện', image: 'https://salt.tikicdn.com/cache/750x750/ts/upload/ea/d3/81/a4ed0166b6abb19c3cfa3a48fadafd02.jpg', href: '#' },
  ];

  const bannerImages = [
    {
      src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/e0/98/77/74e134ee6b9776514aa85b72bd54985e.jpg",
      alt: "premium-banner-0",
      href: "https://tiki.vn/khuyen-mai/mot-sach-tiki"
    },
    {
      src: "https://salt.tikicdn.com/cache/w750/ts/tikimsp/0c/9d/b5/74675cc9e6c6cceb987dcf8b94d5a76e.jpg",
      alt: "premium-banner-1",
      href: "https://tiki.vn/dinh-duong-cho-be/c8339"
    },
    // Add more banner images as needed
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-background text-foreground">
        <main className="container mx-auto pt-8 px-4">
          
          <section className="mb-8 md:mb-12 p-10 rounded-xl bg-accent">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Chào mừng đến với Globimart</h2>
            <p className="text-lg md:text-xl mb-6">Khám phá các sản phẩm quốc tế cao cấp trong tầm tay bạn!</p>
            <button className="bg-primary text-primary-contrastText px-4 py-2 rounded-md hover:bg-primary-dark transition duration-300">
              Mua sắm ngay
            </button>
          </section> <BannerCarousel items={bannerImages} autoScrollInterval={500} />

          <section className="pb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
                {quickLinks.map(({ name, image, color, href }) => (
                  <a key={name} href={href} className="flex flex-col items-center text-center">
                    <div className="w-11 h-11 mb-2 rounded-full overflow-hidden">
                      <img src={image} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-xs" style={{ color: color || 'rgb(39, 39, 42)' }}>{name}</div>
                  </a>
                ))}
              </div>
            </div>
          </section>
          {/* <section className="pb-12">
            <h2 className="text-2xl font-bold mb-6">Danh mục hot</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(({ name, image }) => (
                <div key={name} className="bg-background shadow-lg p-6 rounded-lg text-center hover:bg-white transition duration-300">
                  <img src={image} alt={name} className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-semibold">{name}</h3>
                </div>
              ))}
            </div>
          </section> */}
          <section className="mb-8 md:mb-12 bg-white p-8 rounded-xl">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Sản phẩm nổi bật</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {loading ? (
                <div className="col-span-full flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                products.map((product: Product) => (
                  <Card key={product.id} item={product as unknown as CardItem} />
                ))
              )}
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
    </MainLayout>
  )
}
