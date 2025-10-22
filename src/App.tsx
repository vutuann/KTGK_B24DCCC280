import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";

function App() {
  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts") || "null");
      const samplePosts = [
        {
    id: 1,
    title: "Học lập trình React từ con số 0",
    author: "Hoàng Minh Quân",
    content: "Hướng dẫn chi tiết cách bắt đầu học React cho người mới...",
    category: "Lập trình",
    date: "21/10/2025",
    thumbnail: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Bí quyết sống khỏe mỗi ngày",
    author: "Nguyễn Lan Hương",
    content: "Chỉ với 30 phút tập thể dục và chế độ ăn uống khoa học...",
    category: "Sức khỏe",
    date: "20/10/2025",
    thumbnail: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Khám phá đảo Phú Quốc 3 ngày 2 đêm",
    author: "Vũ Ngọc Ánh",
    content: "Lịch trình chi tiết cho chuyến đi Phú Quốc: bãi Sao, cáp treo...",
    category: "Du lịch",
    date: "19/10/2025",
    thumbnail: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Làm chủ tài chính cá nhân trước tuổi 30",
    author: "Trần Đức Huy",
    content: "Quy tắc 50/30/20, quỹ dự phòng, đầu tư dài hạn...",
    category: "Tài chính",
    date: "17/10/2025",
    thumbnail: "https://images.pexels.com/photos/394371/pexels-photo-394371.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Top 7 plugin VS Code không thể thiếu",
    author: "Lê Thị Mai",
    content: "Tăng năng suất lập trình gấp đôi với Prettier, Live Server...",
    category: "Lập trình",
    date: "16/10/2025",
    thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Nấu phở bò truyền thống tại nhà",
    author: "Phạm Văn Tùng",
    content: "Công thức chuẩn vị Hà Nội: nước dùng trong, bánh phở dai...",
    category: "Ẩm thực",
    date: "14/10/2025",
    thumbnail: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  },
];;
      localStorage.setItem("posts", JSON.stringify(samplePosts));
    }
, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/create" element={<PostForm mode="create" />} />  
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/edit/:id" element={<PostForm mode="edit" />} />
      </Routes>
    </div>
  );
}

export default App;

