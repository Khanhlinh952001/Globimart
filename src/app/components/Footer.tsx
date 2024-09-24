import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-background p-8 border-t">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-foreground">
                    <div>
                        <h3 className="font-bold text-lg mb-4">Về Globimart</h3>
                        <p className="text-sm text-gray-600">Chúng tôi mang đến những sản phẩm tuyệt vời nhất trên thế giới đến tận cửa nhà bạn, được chọn lọc cẩn thận và giao hàng xuất sắc.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Dịch vụ khách hàng</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-blue-600 hover:underline">Liên hệ chúng tôi</Link></li>
                            <li><Link href="#" className="text-blue-600 hover:underline">Câu hỏi thường gặp</Link></li>
                            <li><Link href="#" className="text-blue-600 hover:underline">Thông tin vận chuyển</Link></li>
                            <li><Link href="#" className="text-blue-600 hover:underline">Đổi trả hàng</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-blue-600 hover:underline">Câu chuyện của chúng tôi</Link></li>
                            <li><Link href="#" className="text-blue-600 hover:underline">Blog</Link></li>
                            <li><Link href="#" className="text-blue-600 hover:underline">Cơ hội nghề nghiệp</Link></li>
                            <li><Link href="#" className="text-blue-600 hover:underline">Tìm cửa hàng</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Kết nối với chúng tôi</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-blue-600 hover:text-blue-700">
                                <FaFacebook size={24} />
                            </Link>
                            <Link href="#" className="text-blue-600 hover:text-blue-700">
                                <FaInstagram size={24} />
                            </Link>
                            <Link href="#" className="text-blue-600 hover:text-blue-700">
                                <FaTwitter size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
                <hr className="my-8" />
                <div className="text-center text-foreground-secondary">
                    <p>&copy; 2023 GlobalGoods. Đã đăng ký bản quyền.</p>
                    <div className="mt-4">
                        <Link href="#" className="text-blue-600 hover:underline mx-2">Điều khoản dịch vụ</Link>
                        <Link href="#" className="text-blue-600 hover:underline mx-2">Chính sách bảo mật</Link>
                        <Link href="#" className="text-blue-600 hover:underline mx-2">Chính sách cookie</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
