import { useParams, Link, useNavigate } from 'react-router-dom';
import { Post } from '../types/post';

interface PostDetailProps {
  posts: Post[];
  onDelete: (id: number) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ posts, onDelete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return <div className="text-center py-16 text-red-500 text-xl">Bài viết không tồn tại!</div>;
  }

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      onDelete(post.id);
      navigate('/');
    }
  };

  return (
    <article className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <Link to="/" className="inline-block mb-6 text-blue-600 hover:underline font-medium">
        ← Quay lại danh sách
      </Link>

      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-80 object-cover rounded-lg shadow-md mb-8"
        />
      )}

      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span><strong>Tác giả:</strong> {post.author}</span>
          <span><strong>Ngày đăng:</strong> {post.date}</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>

        <div className="prose prose-lg max-w-none mt-8 text-gray-700 leading-relaxed">
          <p>{post.content}</p>
        </div>
      </div>

      <div className="mt-10 flex space-x-4">
        <Link
          to={`/posts/edit/${post.id}`}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium"
        >
          Chỉnh sửa
        </Link>
        <button
          onClick={handleDelete}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
        >
          Xóa bài viết
        </button>
      </div>
    </article>
  );
};

export default PostDetail;