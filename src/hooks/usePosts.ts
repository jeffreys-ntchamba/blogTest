import { useState, useEffect } from 'react';
import { PostWithAuthor, User } from '../types';
import { api } from '../services/api';

export const usePosts = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const POSTS_PER_PAGE = 9;

  const fetchUsers = async () => {
    try {
      const usersResponse = await api.getUsers();
      setUsers(usersResponse.users);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchPosts = async (page: number = 1, query: string = '') => {
    try {
      setLoading(true);
      setError(null);

      const skip = (page - 1) * POSTS_PER_PAGE;

      let postsResponse;
      if (query) {
        postsResponse = await api.searchPosts(query);
      } else {
        postsResponse = await api.getPosts(POSTS_PER_PAGE, skip);
      }

      const postsWithAuthors: PostWithAuthor[] = postsResponse.posts.map(post => {
        const author = users.find(user => user.id === post.userId);
        return {
          ...post,
          author: author || {
            id: post.userId,
            firstName: 'Unknown',
            lastName: 'Author',
            email: '',
            image: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=face&facepad=2&bg=white`,
            username: 'unknown'
          }
        };
      });

      setPosts(postsWithAuthors);
      setTotalPosts(postsResponse.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length) {
      fetchPosts(currentPage, searchQuery);
    }
  }, [users, currentPage, searchQuery]);


  const handleSearch = (query: string) => {
    setSearchQuery(query);

    setCurrentPage(currentPage);
  };


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    handleSearch,
    handlePageChange,
    refetch: () => fetchPosts(currentPage, searchQuery)
  };
};