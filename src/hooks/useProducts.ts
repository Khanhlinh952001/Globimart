import { useState, useEffect } from 'react';
import { fireStore } from "@/libs/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '@/types/products';


export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsCollection = collection(fireStore, 'products');
        const snapshot = await getDocs(productsCollection);
        const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(productList);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
   console.log(products)
  return { products, loading, error };
}
