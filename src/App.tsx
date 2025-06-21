import { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { BlogPost } from './components/BlogPost';
import { BlogPostDetail } from './components/BlogPostDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { usePosts } from './hooks/usePosts';
import { useFavorites } from './hooks/useFavorites';
import { PostWithAuthor } from './types';
import { Pagination } from '@mui/material';

function App() {
  const [selectedPost, setSelectedPost] = useState<PostWithAuthor | null>(null);

  const {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    handleSearch,
    handlePageChange,
    refetch
  } = usePosts();

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handlePostClick = (post: PostWithAuthor) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header favoritesCount={favorites.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of stories from talented writers around the world.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

        {loading && <LoadingSpinner />}

        {error && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery ? 'No posts found matching your search.' : 'No posts available.'}
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <BlogPost
                  key={post.id}
                  post={post}
                  isLiked={isFavorite(post.id)}
                  onToggleLike={() => toggleFavorite(post.id)}
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </div>

      
            <div className='w-full flex items-center justify-center'>
            
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color='primary' />
            </div>

          </>
        )}
      </main>

      {selectedPost && (
        <BlogPostDetail
          post={selectedPost}
          isLiked={isFavorite(selectedPost.id)}
          onToggleLike={() => toggleFavorite(selectedPost.id)}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;