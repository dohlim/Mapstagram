import { useEffect } from 'react';
import Header from '../components/header';

export default function NotNfound() {
  useEffect(() => {
    document.title = 'Not Found! - Mapstagram';
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-srceen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
}
