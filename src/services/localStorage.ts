export const localStorageService = {
  getFavorites(): number[] {
    try {
      const favorites = localStorage.getItem('blog-favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites from localStorage:', error);
      return [];
    }
  },

  addFavorite(postId: number): void {
    try {
      const favorites = this.getFavorites();
      if (!favorites.includes(postId)) {
        favorites.push(postId);
        localStorage.setItem('blog-favorites', JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error adding favorite to localStorage:', error);
    }
  },

  removeFavorite(postId: number): void {
    try {
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.filter(id => id !== postId);
      localStorage.setItem('blog-favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite from localStorage:', error);
    }
  },

  isFavorite(postId: number): boolean {
    return this.getFavorites().includes(postId);
  }
};