import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F8F9FA', // Màu nền chính của trang
          paper: '#FFFFFF', // Màu nền của các thành phần như card
        },
        foreground: {
          DEFAULT: '#343A40', // Màu chữ chính
          secondary: '#6C757D', // Màu chữ phụ
        },
        primary: {
          DEFAULT: '#007BFF', // Xanh dương chính
          light: '#66b2ff', // Xanh dương sáng
          dark: '#0056b3', // Xanh dương đậm
          contrastText: '#fff', // Màu chữ trên nền primary
        },
        secondary: {
          DEFAULT: '#28A745', // Xanh lá chính
          light: '#71c671', // Xanh lá sáng
          dark: '#1e7e34', // Xanh lá đậm
          contrastText: '#fff', // Màu chữ trên nền secondary
        },
        accent: {
          DEFAULT: '#FFC107', // Cam – Thu hút sự chú ý và khuyến khích hành động
          dark: '#e0a800', // Cam đậm hơn khi hover
        },
        highlight: '#FFD700', // Vàng – Sử dụng hạn chế để tạo điểm nhấn
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
