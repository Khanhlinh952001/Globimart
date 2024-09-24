// src/styles/theme.ts

import { createTheme } from '@mui/material/styles';

// Định nghĩa bảng màu tùy chỉnh
const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF', // Xanh dương chính
      light: '#66b2ff', // Xanh dương sáng
      dark: '#0056b3', // Xanh dương đậm
      contrastText: '#fff', // Màu chữ trên nền primary
    },
    secondary: {
      main: '#28A745', // Xanh lá chính
      light: '#71c671', // Xanh lá sáng
      dark: '#1e7e34', // Xanh lá đậm
      contrastText: '#fff', // Màu chữ trên nền secondary
    },
    background: {
      default: '#F8F9FA', // Màu nền chính của trang
      paper: '#FFFFFF', // Màu nền của các thành phần như card
    },
    text: {
      primary: '#343A40', // Màu chữ chính
      secondary: '#6C757D', // Màu chữ phụ
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

export default theme;
