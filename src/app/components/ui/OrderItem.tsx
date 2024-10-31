import { format, addDays } from 'date-fns';
import { vi } from 'date-fns/locale';

// Define a function to get the appropriate color class based on the order status
const getStatusColorClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'đang xử lý':
      return 'text-blue-600';
    case 'đã giao hàng':
      return 'text-green-600';
    case 'đã hủy':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

// Hàm chuyển đổi trạng thái từ tiếng Anh sang tiếng Việt
const translateStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Đang xử lý';
    case 'delivered':
      return 'Đã giao hàng';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

export const OrderItem: React.FC<{ order: any }> = ({ order }) => (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h3 className="lg:text-lg md:text-md sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-0">Đơn hàng #{order.id.toUpperCase()}</h3>
        <div className="text-sm text-gray-500">
          <p>{format(new Date(order.createdAt.seconds * 1000), "dd MMMM yyyy 'lúc' HH:mm", { locale: vi })}</p>
          <p>Dự kiến đến: {format(addDays(new Date(order.createdAt.seconds * 1000), 10), "dd MMMM yyyy", { locale: vi })}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600">Tổng tiền: <span className="font-semibold text-foreground">{order.total.toLocaleString()} VND</span></p>
          <p className="text-gray-600">Phí vận chuyển: {order.shippingCost.toLocaleString()} VND</p>
          <p className="text-gray-600">Tổng phụ: {order.subtotal.toLocaleString()} VND</p>
        </div>
        <div>
          <p className="text-gray-600">Phương thức vận chuyển: {order.shippingMethod}</p>
          <p className="text-gray-600 ">Phương thức thanh toán: {order.paymentMethod.toUpperCase()}</p>
          {order.pay==true ? <p className="text-gray-600 ">Phương thức thanh toán: {order.pay == true ? "Đã hoàn thành":"Chưa hoàn thành"}</p> :<div> </div>}
         
          <p className="text-gray-600">
            Trạng thái: <span className={`font-medium ${getStatusColorClass(translateStatus(order.status || 'pending'))}`}>
              {translateStatus(order.status || 'pending')}
            </span>
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold text-foreground mb-2">Thông tin người đặt:</h4>
        <p className="text-gray-600">{order.userInfo.displayName}</p>
        <p className="text-gray-600">{order.userInfo.phoneNumber}</p>
        <p className="text-gray-600">{`${order.userInfo.address.street}, ${order.userInfo.address.city}, ${order.userInfo.address.state}, ${order.userInfo.address.zipCode}`}</p>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Sản phẩm:</h4>
        <div className="space-y-4">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-md">
              <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.productName} 
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                  }}
                />
              </div>
              <div className="flex-grow">
                <p className="text-gray-800 font-medium">{item.productName}</p>
                <p className="text-gray-600">Số lượng: {item.quantity}</p>
                <p className="text-gray-600">Giá: {item.price.toLocaleString()} VND</p>
                {item.color && <p className="text-gray-600">Màu sắc: {item.color}</p>}
                {item.size && <p className="text-gray-600">Kích thước: {item.size}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
