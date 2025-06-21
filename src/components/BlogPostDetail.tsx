import { X, Eye, Tag, Heart } from 'lucide-react';
import { PostWithAuthor } from '../types';
import { AuthorInfo } from './AuthorInfo';
import { LikeButton } from './LikeButton';

interface BlogPostDetailProps {
  post: PostWithAuthor;
  isLiked: boolean;
  onToggleLike: () => void;
  onClose: () => void;
}

export const BlogPostDetail= ({
  post,
  isLiked,
  onToggleLike,
  onClose
}:BlogPostDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 pr-8">
            {post.title}
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-lg leading-relaxed text-gray-700">
              {post.body}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <AuthorInfo author={post.author} />
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-500">
                <Eye className="w-5 h-5" />
                <span className="font-medium">{post.views} views</span>
              </div>
              
              <LikeButton
                isLiked={isLiked}
                onToggle={onToggleLike}
                likes={post.reactions.likes}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};