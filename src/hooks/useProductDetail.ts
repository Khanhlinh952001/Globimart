import { useState, useEffect } from 'react';
import { fireStore } from "@/libs/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { Product } from '@/types/products';



interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: Error | null;
}

export function useProduct(id: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setError(new Error('Không có ID sản phẩm.'));
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const docRef = doc(fireStore, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({ id: docSnap.id, ...data } as Product);
        } else {
          setError(new Error('Không tìm thấy sản phẩm với ID này.'));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Đã xảy ra lỗi khi lấy dữ liệu.'));
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
