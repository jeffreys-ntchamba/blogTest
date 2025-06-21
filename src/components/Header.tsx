import { BookOpen, Heart } from 'lucide-react';

interface HeaderProps {
  favoritesCount: number;
}

export const Header= ({ favoritesCount }:HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BlogTest</h1>
              <p className="text-gray-600">Discover amazing stories</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-lg">
            <Heart className="w-5 h-5 text-red-600 fill-current" />
            <span className="text-red-600 font-medium">
              {favoritesCount} liked
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};