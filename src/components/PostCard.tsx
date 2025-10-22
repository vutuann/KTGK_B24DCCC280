import { Link } from 'react-router-dom';
import { Post } from '../types/post';

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="card">
      <img
        src={post.thumbnail || 'https://via.placeholder.com/300x180?text=No+Image'}
        alt={post.title}
      />
      <div className="card-body">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-text">{post.content.substring(0, 100)}...</p>
        <div className="card-meta">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <span className="tag">{post.category}</span>
        </div>
        <div className="card-actions">
          <Link to={`/posts/${post.id}`} className="btn btn-read">
            Đọc thêm
          </Link>
          <button onClick={handleDelete} className="btn btn-delete">
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;