import React from 'react';
import { Eye, Tag } from 'lucide-react';
import { PostWithAuthor } from '../types';
import { AuthorInfo } from './AuthorInfo';
import { LikeButton } from './LikeButton';

interface BlogPostProps {
  post: PostWithAuthor;
  isLiked: boolean;
  onToggleLike: () => void;
  onClick: () => void;
}

export const BlogPost = ({
  post,
  isLiked,
  onToggleLike,
  onClick
}: BlogPostProps) => {
  
  // Empêche le clic sur le like de déclencher la navigation vers les détails
  const gererLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike();
  };

  return (
    <article
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md hover:-translate-y-[2px] transition-transform duration-200 cursor-pointer"
    >
      <div className="p-5">
        
        {/* Affichage des tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.slice(0, 3).map((motCle) => (
            <span
              key={motCle}
              className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center"
            >
              <Tag className="w-3 h-3 mr-1" />
              {motCle}
            </span>
          ))}
        </div>

        {/* Titre du post */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h2>

        {/* Corps du post */}
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
          {post.body}
        </p>

        <div className="flex items-center justify-between border-t pt-3">
          
          {/* Auteur */}
          <AuthorInfo author={post.author} />

          {/* Réactions (vues + like) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-500 text-sm gap-1">
              <Eye className="w-4 h-4" />
              {post.views}
            </div>

            <button onClick={gererLike}>
              <LikeButton
                isLiked={isLiked}
                onToggle={() => {}}
                likes={post.reactions.likes}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
