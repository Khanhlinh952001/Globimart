"use client"

import { useState, useEffect } from 'react'
import { User,  Phone,  Edit2, Save, Trash2, Star } from 'lucide-react'
import MainLayout from '@/layouts/main'
import { useAuth } from '@/contexts/authProvider';
import { useOrder } from '@/hooks/useOrder';
import { format,  fromUnixTime } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';
import { UserInfo, Address } from '@/types/user';
import { fireStore } from '@/libs/firebase';
import { doc, updateDoc, } from 'firebase/firestore';

export default function MyAccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { orders, getOrderHistory} = useOrder();
  const { user } = useAuth();
  console.log(user)
  const [editedUser, setEditedUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    getOrderHistory();
    if (user) {
      setEditedUser({
        uid: user.uid,
        updatedAt: user.updatedAt,
        displayName: user.displayName || '',
        phoneNumber: user.phoneNumber || '',
        addresses: (user as any).addresses || [],
        defaultAddressIndex: (user as any).defaultAddressIndex || 0
      });
    }
  }, [getOrderHistory, user]);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    if (editedUser && user) {
      try {
        const userRef = doc(fireStore, 'customers', user.uid);
        await updateDoc(userRef, {
          displayName: editedUser.displayName,
          phoneNumber: editedUser.phoneNumber,
          addresses: editedUser.addresses,
          defaultAddressIndex: editedUser.defaultAddressIndex
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating user info:', error);
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  }

  const handleAddressChange = (index: number, field: keyof Address, value: string) => {
    if (editedUser) {
      const newAddresses = [...editedUser.addresses];
      newAddresses[index] = { ...newAddresses[index], [field]: value };
      setEditedUser({ ...editedUser, addresses: newAddresses });
    }
  }

  const addNewAddress = () => {
    if (editedUser) {
      const newAddress = { street: '', city: '', state: '', zipCode: '' };
      setEditedUser({
        ...editedUser,
        addresses: [...editedUser.addresses, newAddress]
      });
    }
  }

  const removeAddress = (index: number) => {
    if (editedUser) {
      const newAddresses = editedUser.addresses.filter((_, i) => i !== index);
      let newDefaultIndex = editedUser.defaultAddressIndex;
      if (index === editedUser.defaultAddressIndex) {
        newDefaultIndex = 0;
      } else if (index < editedUser.defaultAddressIndex) {
        newDefaultIndex--;
      }
      setEditedUser({
        ...editedUser,
        addresses: newAddresses,
        defaultAddressIndex: newDefaultIndex
      });
    }
  }

  const setDefaultAddress = (index: number) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        defaultAddressIndex: index
      });
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background pt-10 text-foreground">
        <main className="container mx-auto rounded-xl p-10 bg-white px-4">
          <h1 className="text-xl font-bold mb-8">Tài khoản của tôi</h1>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-md font-semibold">Thông tin tài khoản</h2>
              {isEditing ? (
                <button onClick={handleSave} className="bg-[#28A745] hover:bg-green-600 text-white flex px-4 py-2 rounded">
                  <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
                </button>
              ) : (
                <button onClick={handleEdit} className="bg-[#007BFF] hover:bg-blue-600 text-white flex px-4 py-2 rounded">
                  <Edit2 className="mr-2 h-4 w-4" /> Chỉnh sửa thông tin
                </button>
              )}
            </div>

            {editedUser && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-[#007BFF] mr-2" />
                  <label htmlFor="displayName" className="w-24">Tên:</label>
                  {isEditing ? (
                    <input
                      id="displayName"
                      name="displayName"
                      value={editedUser.displayName}
                      onChange={handleChange}
                      className="flex-grow border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <span>{editedUser.displayName}</span>
                  )}
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-[#007BFF] mr-2" />
                  <label htmlFor="phoneNumber" className="w-24">Số điện thoại:</label>
                  {isEditing ? (
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={editedUser.phoneNumber}
                      onChange={handleChange}
                      className="flex-grow border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    <span>{editedUser.phoneNumber}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="mb-2">Địa chỉ:</label>
                  {editedUser.addresses.map((address, index) => (
                    <div key={index} className="mb-4 p-4 border rounded relative">
                      {isEditing ? (
                        <div>
                          <input
                            value={address.street}
                            onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                            placeholder="Đường"
                            className="w-full mb-2 border rounded px-2 py-1"
                          />
                          <input
                            value={address.city}
                            onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                            placeholder="Thành phố"
                            className="w-full mb-2 border rounded px-2 py-1"
                          />
                          <input
                            value={address.state}
                            onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                            placeholder="Tỉnh/Thành phố"
                            className="w-full mb-2 border rounded px-2 py-1"
                          />
                          <input
                            value={address.zipCode}
                            onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                            placeholder="Mã bưu điện"
                            className="w-full border rounded px-2 py-1"
                          />
                          <div className="flex justify-between mt-2">
                            <button
                              onClick={() => removeAddress(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setDefaultAddress(index)}
                              className={`${
                                editedUser.defaultAddressIndex === index
                                  ? 'text-yellow-500'
                                  : 'text-gray-400'
                              } hover:text-yellow-600`}
                            >
                              <Star className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p>{`${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}</p>
                          {editedUser.defaultAddressIndex === index && (
                            <span className="text-yellow-500 ml-2">(Mặc định)</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button onClick={addNewAddress} className="bg-[#007BFF] text-white px-4 py-2 rounded mt-2">
                      Thêm địa chỉ mới
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className='py-4'>
            <h2 className="text-xl font-bold mb-8">Lịch sử mua hàng</h2>
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                <p className="text-lg font-semibold">Số đơn hàng đã mua: {orders.length}</p>
                <ul className="space-y-4">
                  {orders.map((order, index) => (
                    <li key={order.id} className="border rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold mb-2">Đơn hàng #{index + 1} {order.id.toLowerCase()}</h3>
                      <p>Ngày đặt: {format(fromUnixTime(order.createdAt.seconds), "dd MMMM yyyy 'lúc' HH:mm", { locale: vi })}</p>
                      <p>Tổng tiền: {order.total.toLocaleString('vi-VN')} ₫</p>
                      <p className=' mb-3'>Trạng thái: {order.status}</p>
                      <Link href={'/pages/order-history'} className="mt-4 bg-[#007BFF] hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Xem chi tiết
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-xl text-gray-600">
                  Bạn chưa có đơn hàng nào.
                </p>
              </div>
            )}
          </div>

        </main>
      </div>
    </MainLayout>
  )
}
