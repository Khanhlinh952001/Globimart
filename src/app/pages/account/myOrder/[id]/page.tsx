import { ArrowLeft, Package, Truck, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function MyOrderDetailsPage({ params }: { params: { id: string } }) {
  const order = {
    id: params.id,
    date: '2023-06-10',
    total: 2100000,
    status: 'Shipped',
    items: [
      { id: 1, name: 'Premium Italian Espresso Coffee Beans', price: 399000, quantity: 2 },
      { id: 2, name: 'Organic Matcha Green Tea Powder', price: 279000, quantity: 3 },
      { id: 3, name: 'Authentic Swiss Dark Chocolate Bar', price: 159000, quantity: 1 },
    ],
    shippingAddress: '123 Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam',
    paymentMethod: 'Credit Card',
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Package className="h-6 w-6 text-yellow-500" />
      case 'Shipped':
        return <Truck className="h-6 w-6 text-blue-500" />
      case 'Delivered':
        return <CheckCircle className="h-6 w-6 text-green-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">GlobalGoods</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <Link href="/my-orders" passHref>
          <a className="mb-4 inline-flex items-center text-blue-500 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Orders
          </a>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Order Details: {order.id}</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-lg font-semibold">Order Date: {order.date}</p>
              <p className="text-blue-500 font-bold mt-2">Total: {order.total.toLocaleString('vi-VN')}₫</p>
            </div>
            <div className="flex items-center">
              {getStatusIcon(order.status)}
              <span className="ml-2 font-semibold">{order.status}</span>
            </div>
          </div>

          {/* <Separator className="my-6" /> */}

          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-bold">{(item.price * item.quantity).toLocaleString('vi-VN')}₫</p>
            </div>
          ))}

          {/* <Separator className="my-6" /> */}

          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <p>{order.shippingAddress}</p>

          {/* <Separator className="my-6" /> */}

          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <p>{order.paymentMethod}</p>
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
                <li><a href="#" className="text-blue-500 hover:underline">Contact Us</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">FAQs</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Shipping Information</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Returns & Exchanges</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-500 hover:underline">Our Story</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Blog</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Careers</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Store Locator</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {/* Social media icons can be added here */}
              </div>
            </div>
          </div>
          {/* <Separator className="my-8" /> */}
          <div className="text-center">
            <p>&copy; 2023 GlobalGoods. All rights reserved.</p>
            <div className="mt-4">
              <a href="#" className="text-blue-500 hover:underline mx-2">Terms of Service</a>
              <a href="#" className="text-blue-500 hover:underline mx-2">Privacy Policy</a>
              <a href="#" className="text-blue-500 hover:underline mx-2">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
