"use client"
import { useState, useEffect, createContext, useContext, ReactNode,useMemo } from 'react';
import { useAuth } from "@/contexts/authProvider";
import { fireStore } from '@/libs/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  detailPage:string;
  storeId:string,
  image: string;
  color?: string;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  // Remove the useEffect that syncs on pathname change
  // Instead, we'll sync when the cart changes

  useEffect(() => {
    const syncCart = async () => {
      if (user && cart.length > 0) {
        await syncCartToFirestore(cart);
      }
    };

    syncCart();
  }, [pathname]); // This will trigger when the pathname changes

  const fetchCart = async () => {
    if (user) {
      const cartRef = doc(fireStore, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        const cartData = cartSnap.data().items;
        setCart(Array.isArray(cartData) ? cartData : []);
      } else {
        setCart([]);
      }
    }
  };

  const saveCartToLocal = (newCart: CartItem[]) => {
    if (user) {
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(newCart));
    }
  };

  const addToCart = (item: CartItem) => {
    if (!item) {
      console.error('Cannot add undefined item to cart');
      toast.error('Không thể thêm sản phẩm vào giỏ hàng');
      return;
    }

    setCart(prevCart => {
      const newCart = [...prevCart];
      const existingItem = newCart.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        newCart.push({ ...item, quantity: 1 });
      }
      saveCartToLocal(newCart);
      // Remove syncCartToFirestore call here
      return newCart;
    });

    toast.success('Đã thêm sản phẩm vào giỏ hàng');
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    saveCartToLocal(newCart);
    // Remove syncCartToFirestore call here
    // toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const updateCartItemQuantity = (id: string, quantity: number) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(newCart);
    saveCartToLocal(newCart);
    // Remove syncCartToFirestore call here
    toast.success('Đã cập nhật số lượng sản phẩm');
  };

  const clearCart = async () => {
    setCart([]);
    saveCartToLocal([]);
    
    try {
      await syncCartToFirestore([]); // Sync empty cart to Firestore
    } catch (error) {
      console.error('Lỗi khi xóa giỏ hàng trên Firestore:', error);
      toast.error('Có lỗi xảy ra khi xóa giỏ hàng trên server');
    }
  };

  const syncCartToFirestore = async (newCart: CartItem[]) => {
    if (user) {
      try {
        const cartRef = doc(fireStore, 'carts', user.uid);
        await setDoc(cartRef, { items: newCart }, { merge: true });
      } catch (error) {
        console.error('Error syncing cart to Firestore:', error);
        toast.error('Không thể đồng bộ giỏ hàng. Vui lòng thử lại sau.');
      }
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
  }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
