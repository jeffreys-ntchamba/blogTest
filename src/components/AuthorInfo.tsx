import { User } from '../types';

interface AuthorInfoProps {
  author: User;
}

export const AuthorInfo= ({ author }:AuthorInfoProps) => {
  return (
    <div className="flex items-center space-x-3">
      <img
        src={author.image}
        alt={`${author.firstName} ${author.lastName}`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="font-medium text-gray-900">
          {author.firstName} {author.lastName}
        </p>
        <p className="text-sm text-gray-500">@{author.username}</p>
      </div>
    </div>
  );
};