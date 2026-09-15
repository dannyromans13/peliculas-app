// context/FavoritesContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Movie } from '@/services/tmdbApi';
import { getFavorites, saveFavorites } from '@/services/favoritesStorage';

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    getFavorites().then(setFavorites);
  }, []);

  function addFavorite(movie: Movie) {
    const updated = [...favorites, movie];
    setFavorites(updated);
    saveFavorites(updated);
  }

  function removeFavorite(id: number) {
    const updated = favorites.filter((m) => m.id !== id);
    setFavorites(updated);
    saveFavorites(updated);
  }

  function isFavorite(id: number) {
    return favorites.some((m) => m.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  return context;
}