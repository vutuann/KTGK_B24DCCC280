import { Category } from './post';

export interface PostFormData {
  title: string;
  content: string;
  author: string;
  date: string;
  thumbnail?: string;
  category: Category;
}