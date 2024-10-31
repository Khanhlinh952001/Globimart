"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/cartProvider';
import { useAuth } from '@/contexts/authProvider';
import MainLayout from '@/layouts/main';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { UserInfo, PaymentMethod, ShippingMethod, Address } from '@/types/user';
import { useOrder } from '@/hooks/useOrder';
import Link from 'next/link';
import { Loading } from '@/app/components/ui/Loading';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrder();
  
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [shippingMethod, setShippingMethod] = useState<string>('');
  const [editableFields, setEditableFields] = useState({
    displayName: false,
    phoneNumber: false,
  });
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(user);
  const [newAddress, setNewAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
 ;

  const paymentMethods: PaymentMethod[] = [
    { id: 'cod', name: 'Thanh toán khi nhận hàng' },
    { id: 'bank_transfer', name: 'Chuyển khoản ngân hàng' },
    { id: 'credit_card', name: 'Thẻ tín dụng' },
  ];

  const shippingMethods: ShippingMethod[] = [
    { id: 'standard', name: 'Giao hàng tiêu chuẩn', price: 30000 },
    { id: 'express', name: 'Giao hàng nhanh', price: 50000 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => prev ? { ...prev, [name]: value } : null);
  };


  
  const handleSubmit = async () => {
    if (!paymentMethod || !shippingMethod || !user) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      const order = {
        customerId: user.uid,
        userInfo: {
          displayName: user.displayName || '',
          phoneNumber: user.phoneNumber || '',
          address: user.addresses[selectedAddressIndex] || {},
        },
        items: cart.map(item => ({
          id: item.id,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
          detailPage: item.detailPage,
          storeId: item.storeId,
          color: item.color || '',
          image: item.image || '',
          size: item.size || 'freeSize',
        })),
        paymentMethod,
        shippingMethod,
        shippingCost: shippingCost,
        subtotal,
        total: totalAmount,
        status: 'pending',
      };

      const orderId = await createOrder(order);
      console.log('Đơn hàng đã được lưu vào Firestore với ID:', orderId);

      clearCart();
      router.push('/pages/thank-you');
    } catch (error) {
      console.error('Lỗi chi tiết khi xử lý đơn hàng:', error);
      alert('Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.');
    }
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = shippingMethods.find(method => method.id === shippingMethod)?.price || 0;
  const totalAmount = subtotal + shippingCost;

  const toggleEditable = (field: keyof typeof editableFields) => {
    setEditableFields(prev => ({ ...prev, [field]: !prev[field] }));
  };



  return (
    <MainLayout>
      {
        user ? (<div className="p-4 bg-background text-foreground-secondary px-10">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Thanh toán</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Thông tin đơn hàng</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
                <div className="flex items-center">
                  <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover mr-4 rounded" />
                  <div>
                    <h3 className="font-semibold">
                      {item.productName.length > 30
                        ? `${item.productName.substring(0, 30)}...`
                        : item.productName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Màu sắc: {item.color}, Kích thước: {item.size}
                    </p>
                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4 text-foreground">
              <div className="flex justify-between mb-2">
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Phí vận chuyển:</span>
                <span>{shippingCost.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Tổng cộng:</span>
                <span>{totalAmount.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Thông tin thanh toán</h2>
            
            <div className="mb-4">
              <label htmlFor="displayName" className="block mb-1 text-foreground">Họ tên</label>
              <div className="flex items-center">
                <input 
                  type="text" 
                  id="displayName" 
                  name="displayName"
                  className={`w-full p-2 ${
                    editableFields.displayName 
                      ? 'border-blue-500 border-2' 
                      : 'border text-gray-700 bg-gray-100'
                  }`}
                  value={user.displayName || ''}
                  onChange={handleInputChange}
                  readOnly={!editableFields.displayName}
                />
                {editableFields.displayName ? (
                  <FaCheck 
                    className="ml-2 cursor-pointer text-green-600" 
                    onClick={() => toggleEditable('displayName')}
                  />
                ) : (
                  <FaEdit 
                    className="ml-2 cursor-pointer text-blue-600" 
                    onClick={() => toggleEditable('displayName')}
                  />
                )}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-1 text-foreground">Số điện thoại</label>
              <div className="flex items-center">
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber"
                  className={`w-full p-2 ${
                    editableFields.phoneNumber 
                      ? 'border-blue-500 border-2' 
                      : 'border text-gray-700 bg-gray-100'
                  }`}
                  value={user.phoneNumber || ''}
                  onChange={handleInputChange}
                  readOnly={!editableFields.phoneNumber}
                />
                {editableFields.phoneNumber ? (
                  <FaCheck 
                    className="ml-2 cursor-pointer text-green-600" 
                    onClick={() => toggleEditable('phoneNumber')}
                  />
                ) : (
                  <FaEdit 
                    className="ml-2 cursor-pointer text-blue-600" 
                    onClick={() => toggleEditable('phoneNumber')}
                  />
                )}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-foreground">Chọn địa chỉ giao hàng</h3>
              {user.addresses.map((address: Address, index: number) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`address_${index}`}
                    name="selectedAddress"
                    value={index}
                    checked={selectedAddressIndex === index}
                    onChange={() => setSelectedAddressIndex(index)}
                    className="mr-2"
                  />
                  <label htmlFor={`address_${index}`}>
                    {`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`}
                  </label>
                </div>
              ))}
             
                <Link href={'/pages/account/myAccount'}
                  type="button"
                  className="mt-2 text-blue-600 hover:text-blue-800"
                >
                  + Thêm địa chỉ mới
                </Link>
              
         
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2 text-foreground">Phương thức vận chuyển</h3>
              {shippingMethods.map((method) => (
                <div key={method.id} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`shipping_${method.id}`}
                    name="shippingMethod"
                    value={method.id}
                    checked={shippingMethod === method.id}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`shipping_${method.id}`}>
                    {method.name} - {method.price.toLocaleString('vi-VN')} đ
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-foreground">Phương thức thanh toán</h3>
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`payment_${method.id}`}
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={`payment_${method.id}`}>{method.name}</label>
                </div>
              ))}
            </div>

            <button 
              onClick={handleSubmit} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full transition duration-300"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>):
      ( <div className="col-span-full h-screen bg-background flex justify-center items-center">
        <Loading />
      </div>)
      }
      
    </MainLayout>
  );
};

export default CheckoutPage;
