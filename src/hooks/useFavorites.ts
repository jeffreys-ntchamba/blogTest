import { useState, useEffect } from 'react';
import { localStorageService } from '../services/localStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(localStorageService.getFavorites());
  }, []);

  const toggleFavorite = (postId: number) => {
    const isFavorite = favorites.includes(postId);
    
    if (isFavorite) {
      localStorageService.removeFavorite(postId);
      setFavorites(prev => prev.filter(id => id !== postId));
    } else {
      localStorageService.addFavorite(postId);
      setFavorites(prev => [...prev, postId]);
    }
  };

  const isFavorite = (postId: number) => favorites.includes(postId);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};