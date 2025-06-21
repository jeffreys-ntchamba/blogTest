import { Post, User, PostsResponse, UsersResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

export const api = {
  async getPosts(limit = 20, skip = 0): Promise<PostsResponse> {
    const response = await fetch(`${BASE_URL}/posts?limit=${limit}&skip=${skip}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  async getPost(id: number): Promise<Post> {
    const response = await fetch(`${BASE_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },

  async getUsers(): Promise<UsersResponse> {
    const response = await fetch(`${BASE_URL}/users?limit=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  },

  async getUser(id: number): Promise<User> {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  },

  async searchPosts(query: string): Promise<PostsResponse> {
    const response = await fetch(`${BASE_URL}/posts/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search posts');
    }
    return response.json();
  }
};