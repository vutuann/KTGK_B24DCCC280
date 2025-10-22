import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostForm({ mode }: { mode: "create" | "edit" }) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Khác");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (mode === "edit" && id) {
      const posts = JSON.parse(localStorage.getItem("posts") || "[]");
      const post = posts.find((p: any) => p.id === Number(id));
      if (post) {
        setTitle(post.title);
        setAuthor(post.author);
        setContent(post.content);
        setCategory(post.category || "Khác");
        setThumbnail(post.thumbnail || "");
      }
    }
  }, [mode, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");

    if (mode === "create") {
      const newPost = {
        id: Date.now(),
        title,
        author,
        content,
        category,
        thumbnail,
        date: new Date().toLocaleDateString(),
      };
      localStorage.setItem("posts", JSON.stringify([...posts, newPost]));
      navigate("/");
    } else {
      const updated = posts.map((p: any) =>
        p.id === Number(id)
          ? { ...p, title, author, content, category, thumbnail }
          : p
      );
      localStorage.setItem("posts", JSON.stringify(updated));
      navigate(`/posts/${id}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{mode === "create" ? "Tạo bài viết mới" : "Chỉnh sửa bài viết"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề:</label><br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Tác giả:</label><br />
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <label>Thể loại:</label><br />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Công nghệ</option>
            <option>Du lịch</option>
            <option>Ẩm thực</option>
            <option>Đời sống</option>
            <option>Khác</option>
          </select>
        </div>
        <div>
          <label>URL ảnh thumbnail:</label><br />
          <input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
        </div>
        <div>
          <label>Nội dung:</label><br />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} />
        </div>
        <br />
        <button type="submit">{mode === "create" ? "Đăng bài" : "Cập nhật"}</button>
        <button type="button" onClick={() => navigate(mode === "create" ? "/" : `/posts/${id}`)}>
          Hủy
        </button>
      </form>
    </div>
  );
}
