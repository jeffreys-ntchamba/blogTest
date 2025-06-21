export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  username: string;
}

export interface PostWithAuthor extends Post {
  author: User;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}