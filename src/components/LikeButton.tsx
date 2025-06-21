import { Heart } from 'lucide-react';

interface LikeButtonProps {
  isLiked: boolean;
  onToggle: () => void;
  likes: number;
}

export const LikeButton = ({ isLiked, onToggle, likes }:LikeButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-all duration-200 transform hover:scale-105 ${
        isLiked
          ? 'bg-red-50 text-red-600 hover:bg-red-100'
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ${
          isLiked ? 'fill-current text-red-600' : ''
        }`}
      />
      <span className="text-sm font-medium">{likes}</span>
    </button>
  );
};