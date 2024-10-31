import React from 'react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { CardItem } from '@/types/card';

interface CardProps {
  item: CardItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="w-[151px] min-w-[151px] min-h-[300px] bg-white ">
      <Link href={`/pages/product/${item.id}`} className="block h-full">
        <div className="flex flex-col h-full">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src={item.images[0]}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Add badges or labels here if needed */}
          </div>
          <div className="flex flex-col p-2 gap-1 flex-grow">
            <div className="h-[58px] flex flex-col gap-1">
              <h3 className="text-sm font-medium line-clamp-2">{item.productName}</h3>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className={`h-3 w-3 ${index < (item.star || 5) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className={`font-semibold ${item.sales === item.price ? 'text-black' : 'text-red-500'}`}>
                {item.sales.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </div>
              {item.sales < item.price && (
                <div className="flex items-center gap-1">
                  <span className="bg-red-100 text-red-500 text-xs px-1 rounded">
                    -{Math.round((1 - item.sales / item.price) * 100)}%
                  </span>
                  <span className="text-gray-500 text-xs line-through">
                    {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </span>
                </div>
              )}
            </div>
            {/* {item.importInfo && (
              <div className="text-xs text-gray-600">{item.importInfo}</div>
            )} */}
            <div className="text-xs text-gray-600">
              Giao {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit' })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
