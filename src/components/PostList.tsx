import { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';
import { Post } from '../types/post';

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-group">
        <h1 className="page-title">Tất cả bài viết ({filteredPosts.length})</h1>
        <Link to="/create" className="btn-primary">Viết bài mới</Link>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm theo tiêu đề..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {filteredPosts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280', margin: '3rem 0' }}>
          Không tìm thấy bài viết nào.
        </p>
      ) : (
        <div className="grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;