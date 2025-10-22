import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import { initialPosts } from './data/initialPosts';
import { Post } from './types/post';
import { PostFormData } from './types/postForm';


function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (newPost: PostFormData) => {
    const id = Math.max(...posts.map(p => p.id), 0) + 1;
    setPosts(prev => [...prev, { id, ...newPost }]);
  };

  const updatePost = (updated: Post) => {
    setPosts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const deletePost = (id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  // chung handler cho PostForm: nhận cả create (PostFormData) và edit (Post)
  const handlePostFormSubmit = (data: Post | PostFormData) => {

    if ((data as Post).id !== undefined) {
      updatePost(data as Post);
    } else {
      addPost(data as PostFormData);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<PostList posts={posts} onDelete={deletePost} />} />
          <Route path="/posts" element={<PostList posts={posts} onDelete={deletePost} />} />
          <Route path="/create" element={<PostForm onSubmit={handlePostFormSubmit} />} />
          <Route path="/posts/create" element={<PostForm onSubmit={handlePostFormSubmit} />} />
          <Route path="/posts/:id" element={<PostDetail posts={posts} onDelete={deletePost} />} />
          <Route path="/posts/edit/:id" element={<PostForm posts={posts} onSubmit={handlePostFormSubmit} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
