import { useEffect } from 'react';

export default function NotNfound() {
  useEffect(() => {
    document.title = 'Not Found! - Mapstagram';
  }, []);
  return (
    <div clasName="bg-gray-background">
      <div className="mx-auth max-w-srceen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
}
