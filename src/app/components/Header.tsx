"use client";
import { useState } from 'react';
import { ShoppingCart, Bell, Search, Menu, User2, LogOut, UserCheck, Settings, Home } from 'lucide-react';
import { RiMapPinUserFill } from "react-icons/ri";
import Link from 'next/link';
import { Badge } from '@mui/material';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="bg-primary">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-2">
        <Link href="/" className="font-bold text-center text-primary-contrastText mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl">Globimart</h1>
          <p className="text-sm md:text-base sm:hi">Hàng hoá toàn cầu, tiện ích địa phương</p>
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 md:w-64 px-3 py-2 rounded-md text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-contrastText">
              <Search className="h-5 w-5 text-foreground-secondary" />
            </button>
          </div>
          
          <button className="p-2 flex text-primary-contrastText hover:bg-primary-dark rounded-full">
            <Home className="h-5 w-5 mr-1" /> <span className='md:block lg:block sm:hidden'>Trang chủ</span> 
          </button>
          
          <div className="relative">
            <button className="p-2 text-primary-contrastText flex hover:bg-primary-dark rounded-full" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <User2 className="h-5 w-5 mr-1" /> <span className='md:block lg:blockn sm:hidden'> Đăng nhập</span>
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 text-foreground-secondary w-48 bg-white rounded-md shadow-lg py-2">
                <Link href="/pages/account/myAccount" className="px-4 py-2 hover:bg-gray-200 flex items-center">
                  <UserCheck className="mr-2"/> Profile
                </Link>
                <Link href="/pages/settings" className="px-4 py-2 hover:bg-gray-200 flex items-center">
                  <Settings className="mr-2"/> Settings
                </Link>
                <a href="#" className="px-4 py-2 hover:bg-gray-200 flex items-center">
                  <LogOut className="mr-2"/> Logout
                </a>
              </div>
            )}
          </div>
          
          <Badge badgeContent={4} color="error">
            <Link href="/pages/cart" className="p-2 text-primary-contrastText hover:bg-primary-dark rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </Link>  
          </Badge>
        
        
        </div>
      </div>
   
      <div className="h-10 bg-slate-100">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-2">
          <div className="flex cursor-help items-center">
            <RiMapPinUserFill className="text-xl text-primary font-bold" /> 
            <p className="ml-2 text-foreground-secondary">Giao đến:</p> 
            <span className="ml-2 text-primary underline">Bạn muốn giao hàng đến đâu?</span>
          </div>
          <div>
            <ul className="flex flex-wrap space-x-4 text-sm text-foreground cursor-default">
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
