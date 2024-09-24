import { Package, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function MyOrdersPage() {
  const orders = [
    { id: 'ORD-001', date: '2023-05-15', total: 1250000, status: 'Delivered' },
    { id: 'ORD-002', date: '2023-06-02', total: 780000, status: 'Processing' },
    { id: 'ORD-003', date: '2023-06-10', total: 2100000, status: 'Shipped' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">GlobalGoods</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">My Orders</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {orders.map((order, index) => (
            <div key={order.id}>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold  text-foreground">{order.id}</h2>
                  <p className="text-gray-600">Ordered on {order.date}</p>
                  <p className="text-blue-600 font-bold mt-2">{order.total.toLocaleString('vi-VN')}₫</p>
                  <span className={`mt-2 inline-block px-2 py-1 text-sm font-semibold rounded text-white ${
                    order.status === 'Delivered' ? 'bg-green-600' :
                    order.status === 'Processing' ? 'bg-yellow-500' :
                    'bg-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <Link href={`/my-orders/${order.id}`} passHref>
                  <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </div>
                </Link>
              </div>
              {index < orders.length - 1 && <hr className="my-6" />}
            </div>
          ))}
        </div>
      </main>

    
    </div>
  )
}
