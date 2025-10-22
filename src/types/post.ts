export type Category = 'Công nghệ' | 'Du lịch' | 'Ẩm thực' | 'Đời sống' | 'Khác';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  thumbnail?: string;
  category: Category;
}