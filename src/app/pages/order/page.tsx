"use client"
import { useState } from 'react'
import { CreditCard, Truck, Package, CheckCircle } from 'lucide-react'


export default function OrderPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  const handlePlaceOrder = () => {
    // toast({
    //   title: "Order Placed Successfully",
    //   description: "Thank you for your purchase! Your order has been received.",
    // })
  }

  const orderItems = [
    { id: 1, name: 'Premium Italian Espresso Coffee Beans', price: 399000, quantity: 2 },
    { id: 2, name: 'Organic Matcha Green Tea Powder', price: 279000, quantity: 1 },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 50000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#007BFF] p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">GlobalGoods</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Complete Your Order</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section className="bg-white p-6 rounded-lg shadow-md mb-8 text-foreground">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input id="firstName" placeholder="John" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input id="lastName" placeholder="Doe" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input id="address" placeholder="123 Main St" className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input id="city" placeholder="Ho Chi Minh City" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input id="postalCode" placeholder="70000" className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                  <select id="country" className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-foreground">
                    <option value="vietnam">Vietnam</option>
                    <option value="thailand">Thailand</option>
                    <option value="singapore">Singapore</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <input type="radio" id="credit-card" name="paymentMethod" value="credit-card" checked={paymentMethod === 'credit-card'} onChange={() => setPaymentMethod('credit-card')} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="credit-card" className="block text-sm font-medium text-gray-700">Credit Card</label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <input type="radio" id="paypal" name="paymentMethod" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="paypal" className="block text-sm font-medium text-gray-700">PayPal</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="bank-transfer" name="paymentMethod" value="bank-transfer" checked={paymentMethod === 'bank-transfer'} onChange={() => setPaymentMethod('bank-transfer')} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                  <label htmlFor="bank-transfer" className="block text-sm font-medium text-gray-700">Bank Transfer</label>
                </div>
              </div>

              {paymentMethod === 'credit-card' && (
                <div className="mt-4 space-y-4 text-foreground">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input id="expiryDate" placeholder="MM/YY" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <input id="cvv" placeholder="123" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="md:col-span-1">
            <section className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Order Summary</h2>
              {orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <span className=' text-foreground-secondary'>{item.name} (x{item.quantity})</span>
                  <span className=' text-foreground-secondary'>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between items-center mb-2 text-foreground">
                <span>Subtotal</span>
                <span className='text-foreground'>{subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between items-center mb-2 text-foreground">
                <span>Shipping</span>
                <span>{shipping.toLocaleString('vi-VN')}₫</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between items-center font-bold text-foreground">
                <span>Total</span>
                <span>{total.toLocaleString('vi-VN')}₫</span>
              </div>
              <button className="w-full mt-6 bg-[#007BFF] text-white hover:bg-blue-600 py-2 px-4 rounded" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md text-foreground">
              <h2 className="text-xl font-semibold mb-4">Order Information</h2>
              <div className="space-y-4 text-foreground-secondary">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-[#007BFF] mr-2" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-[#007BFF] mr-2" />
                  <span>Free shipping on orders over 1,000,000₫</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-[#007BFF] mr-2" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 p-8 mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About GlobalGoods</h3>
              <p className="text-sm text-gray-600">We bring the world's finest products to your doorstep, curated with care and delivered with excellence.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#007BFF] hover:underline">Contact Us</a></li>
                <li><a href="#" className="text-[#007BFF] hover:underline">FAQs</a></li>
                <li><a href="#" className="text-[#007BFF] hover:underline">Shipping Information</a></li>
                <li><a href="#" className="text-[#007BFF] hover:underline">Returns & Exchanges</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#007BFF] hover:underline">Our Story</a></li>
                <li><a href="#" className="text-[#007BFF] hover:underline">Blog</a></li>
                <li><a href="#" className="text-[#007BFF] hover:underline">Careers</a></li>
                <li><a href="#" className="text-[#007BFF] hover:underline">Store Locator</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#007BFF] hover:text-blue-700">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[#007BFF] hover:text-blue-700">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[#007BFF] hover:text-blue-700">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11
20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <hr className="my-8" />
          <div className="text-center">
            <p>&copy; 2023 GlobalGoods. All rights reserved.</p>
            <div className="mt-4">
              <a href="#" className="text-[#007BFF] hover:underline mx-2">Terms of Service</a>
              <a href="#" className="text-[#007BFF] hover:underline mx-2">Privacy Policy</a>
              <a href="#" className="text-[#007BFF] hover:underline mx-2">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
