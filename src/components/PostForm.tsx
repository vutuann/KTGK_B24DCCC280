import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post, Category } from '../types/post';

interface PostFormProps {
  posts?: Post[];
  onSubmit: (post: Omit<Post, 'id'> | Post) => void;
}

const categories: Category[] = ['Công nghệ', 'Du lịch', 'Ẩm thực', 'Đời sống', 'Khác'];

const PostForm: React.FC<PostFormProps> = ({ posts, onSubmit }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existing = isEdit && posts ? posts.find(p => p.id === Number(id)) : null;

  const today = new Date().toISOString().split('T')[0];

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('Công nghệ');
  const [date] = useState(today);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setAuthor(existing.author);
      setThumbnail(existing.thumbnail || '');
      setContent(existing.content);
      setCategory(existing.category);
    }
  }, [existing]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Tiêu đề là bắt buộc';
    else if (title.trim().length < 10) newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';

    if (!author.trim()) newErrors.author = 'Tác giả là bắt buộc';
    else if (author.trim().length < 3) newErrors.author = 'Tác giả phải có ít nhất 3 ký tự';

    if (!content.trim()) newErrors.content = 'Nội dung là bắt buộc';
    else if (content.trim().length < 50) newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const postData = { title: title.trim(), content: content.trim(), author: author.trim(), date, thumbnail: thumbnail.trim() || undefined, category };

    if (isEdit) {
      onSubmit({ id: Number(id), ...postData });
      alert('Cập nhật thành công!');
      navigate(`/posts/${id}`);
    } else {
      onSubmit(postData);
      alert('Đăng bài thành công!');
      navigate('/');
    }
  };

  const handleCancel = () => {
    if (isEdit) {
      navigate(`/posts/${id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {isEdit ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề *</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Nhập tiêu đề bài viết..."
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tác giả *</label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tên tác giả..."
          />
          {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL ảnh thumbnail</label>
          <input
            type="url"
            value={thumbnail}
            onChange={e => setThumbnail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Preview"
              className="mt-3 w-full h-48 object-cover rounded-lg shadow"
              onError={e => (e.currentTarget.style.display = 'none')}
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thể loại</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value as Category)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung bài viết *</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={12}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-vertical ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Viết nội dung bài viết..."
          />
          <p className="text-sm text-gray-500 mt-1">Độ dài: {content.length} ký tự (tối thiểu 50)</p>
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {isEdit ? 'Cập nhật' : 'Đăng bài'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;