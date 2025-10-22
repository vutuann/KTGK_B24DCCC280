import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
  category?: string;
  thumbnail?: string;
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const posts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const found = posts.find((p) => p.id === Number(id));
    setPost(found || null);
  }, [id]);

  if (!post) return <p>Bài viết không tồn tại.</p>;

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      const posts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
      const updated = posts.filter((p) => p.id !== post.id);
      localStorage.setItem("posts", JSON.stringify(updated));
      navigate("/");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{post.title}</h2>
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          style={{ width: "400px", height: "200px", objectFit: "cover", marginBottom: "10px" }}
        />
      )}
      <p>
        <b>Tác giả:</b> {post.author} <br />
        <b>Ngày đăng:</b> {post.date} <br />
        <b>Thể loại:</b> {post.category || "Khác"}
      </p>
      <p>{post.content}</p>
      <button onClick={() => navigate("/")}>Quay lại</button>{" "}
      <button onClick={() => navigate(`/posts/edit/${post.id}`)}>Chỉnh sửa</button>{" "}
      <button onClick={handleDelete}>Xóa bài viết</button>
    </div>
  );
}
