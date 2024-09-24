"use client"
import { useState } from 'react'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import MainLayout from '@/layouts/main'
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Premium Italian Espresso Coffee Beans', price: 399000, quantity: 2, image: '/placeholder.svg?height=80&width=80' },
    { id: 2, name: 'Organic Matcha Green Tea Powder', price: 279000, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
    { id: 3, name: 'Authentic Swiss Dark Chocolate Bar', price: 159000, quantity: 3, image: '/placeholder.svg?height=80&width=80' },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50000 // Flat rate shipping
  const total = subtotal + shipping

  return (
    <MainLayout>

    
    <div className="min-h-screen bg-white">
    

      <main className="container mx-auto px-4 pt-10 text-foreground">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-600">Your cart is empty</p>
            <button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                  <div className="flex-grow">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-blue-600 font-bold">{item.price.toLocaleString('vi-VN')}₫</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="border border-gray-300 rounded p-1"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 mx-2 text-center border border-gray-300 rounded"
                      />
                      <button
                        className="border border-gray-300 rounded p-1"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>{shipping.toLocaleString('vi-VN')}₫</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{total.toLocaleString('vi-VN')}₫</span>
                </div>
                <button className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      
    </div></MainLayout>
  )
}
