import { fireStore } from "@/libs/firebase";
import { useAuth } from "@/contexts/authProvider";
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { useState, useCallback } from "react";
import { Order } from "@/types/order";

export const useOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  // Add loading and error states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) {
      console.warn("No authenticated user. Cannot create order.");
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const orderRef = collection(fireStore, "orders");
      const newOrder = {
        ...orderData,
        customerId: user.uid,
        createdAt: new Date()
      };
      const docRef = await addDoc(orderRef, newOrder);
      setLoading(false);
      return docRef.id;
    } catch (err) {
      setLoading(false);
      setError("Failed to create order");
      throw err;
    }
  }, [user]);

  const deleteOrder = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const orderRef = doc(fireStore, "orders", orderId);
      await deleteDoc(orderRef);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to delete order");
      throw err;
    }
  }, []);

  const getOrderHistory = useCallback(async () => {
    if (!user) {
      console.warn("No authenticated user. Returning empty order history.");
      return [];
    }
    setLoading(true);
    setError(null);
    try {
      const orderRef = collection(fireStore, "orders");
      const q = query(orderRef, where("customerId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const orderHistory = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
      setOrders(orderHistory);
      setLoading(false);
      return orderHistory;
    } catch (err) {
      setLoading(false);
      setError("Failed to fetch order history");
      throw err;
    }
  }, [user]);

  return {
    orders,
    createOrder,
    deleteOrder,
    getOrderHistory,
    loading,
    error
  };
};
