import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface PostCardProps {
  post: any;
  onDelete?: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        display: "flex",
        gap: "10px",
      }}
    >
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          style={{ width: "150px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
        />
      )}
      <div style={{ flex: 1 }}>
        <h3>{post.title}</h3>
        <p>
          <b>Tác giả:</b> {post.author} <br />
          <b>Ngày:</b> {post.date} <br />
          <b>Thể loại:</b> {post.category || "Khác"}
        </p>
        <p>{post.content.slice(0, 100)}...</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/posts/${post.id}`}>
            <button>Xem chi tiết</button>
          </Link>
          {onDelete && (
            <button
              style={{ color: "red" }}
              onClick={() => onDelete(post.id)}
            >
              Xóa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

