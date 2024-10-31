"use client";
import { use, useState, useEffect } from 'react';
import { ShoppingCart, Bell, Search, Menu, User2, LogOut, UserCheck, Settings, Home } from 'lucide-react';
import { RiMapPinUserFill } from "react-icons/ri";
import Link from 'next/link';
import { Badge } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authProvider';
import { useCart } from '@/contexts/cartProvider';
import { UserInfo } from '@/types/user';

import { CgBorderTop } from "react-icons/cg";

function Header() {
  const { user, logout } = useAuth()
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  // Giả sử bạn có một state hoặc context để kiểm tra trạng thái đăng nhập
  const isLoggedIn = !!user; // Replace the isLoggedIn check with a check for user

  useEffect(() => {
    if (user && cart && cart.length > 0) {
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
    }
  }, [user, cart]);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      router.push('/auth/login'); // Chuyển hướng đến trang đăng nhập
    }
  };

  useEffect(() => {
    // Cập nhật header khi gi hàng thay đổi
    console.log('Cart updated:', cart);
    // Thêm logic cập nhật header ở đây
  }, [cart]);

  const truncateAddress = (address: string, maxLength: number = 30) => {
    if (address.length <= maxLength) return address;
    return address.slice(0, maxLength - 14) + '...';
  };

  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center py-2">
        {/* Logo and tagline */}
        <Link href="/" className="font-bold text-center text-primary-contrastText mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl">Globimart</h1>
          <p className="text-xs md:text-sm">Hàng hoá toàn cầu, tiện ích địa phương</p>
        </Link>

        {/* Navigation items */}
        <div className="flex flex-wrap justify-center items-center space-x-2 md:space-x-4">
          {/* Search input */}
          <div className="relative w-full md:w-auto mb-2 md:mb-0">
            <input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-3 py-2 rounded-md text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-contrastText">
              <Search className="h-5 w-5 text-foreground-secondary" />
            </button>
          </div>

          {/* Navigation buttons */}
          <Link href={'/'} className="p-2 cursor-point flex text-primary-contrastText hover:bg-primary-dark rounded-full">
            <Home className="h-5 w-5 mr-1" /> <span className='hidden md:inline'>Trang chủ</span>
          </Link>

          {/* User menu */}
          <div className="relative">
            <button
              className="p-2 text-primary-contrastText flex hover:bg-primary-dark rounded-full"
              onClick={handleAuthClick}
            >
              <User2 className="h-5 w-5 mr-1" />
              <span className='hidden md:inline'>
                {isLoggedIn ? user.displayName || 'Tài khoản' : 'Đăng nhập'}
              </span>
            </button>
            {isLoggedIn && isUserMenuOpen && (
              <div className="absolute right-0 mt-2 text-foreground-secondary w-48 bg-white rounded-md shadow-lg py-2">
                <Link href="/pages/account/myAccount" className="px-4 py-2 hover:bg-gray-200 flex items-center">
                  <UserCheck className="mr-2" /> Trang cá nhân 
                </Link>
                <Link href="/pages/order-history" className="px-4 py-2 hover:bg-gray-200 flex items-center">
                  <CgBorderTop className="mr-2" /> Lịch sữ mua hàng
                </Link>
                <Link href="/pages/settings" className="px-4 py-2 hover:bg-gray-200 flex items-center">
                  <Settings className="mr-2" /> Cài đặt
                </Link>
                <button
                  onClick={()=>logout()}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <LogOut className="mr-2" /> Đăng xuất
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <Badge badgeContent={cart?.length || 0} color="error">
            <Link href="/pages/cart" className="p-2 text-primary-contrastText hover:bg-primary-dark rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Badge>
        </div>
      </div>

      {/* Delivery info and guarantees */}
      <div className="h-auto md:h-10 bg-slate-100 py-2 md:py-0">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex  items-center mb-2 md:mb-0">
            <RiMapPinUserFill className="text-xl text-primary font-bold" />
            <p className="ml-2 mt-2 text-foreground-secondary sm:text-sm">Giao đến:</p>
            <span className="ml-2 mt-3 text-primary underline sm:text-sm md:text-md ">
              {truncateAddress((user as unknown as UserInfo)?.addresses?.[user?.defaultAddressIndex || 0]?.street || 'Bạn muốn giao hàng đến đâu?')}
            </span>
          </div>
          <div className='md:hidden sm:hidden lg:block'>
            <ul className="flex flex-wrap justify-center md:justify-end space-x-2 md:space-x-4 text-xs md:text-sm text-foreground cursor-default">
              <li>Cam kết 100% hàng thật</li>
              <li>Hoàn 200% nếu hàng giả</li>
              <li>30 ngày đổi trả</li>
              <li>Giao nhanh 7 ngày</li>
              <li>Giá siêu rẻ</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
