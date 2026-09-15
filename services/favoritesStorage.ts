// services/favoritesStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from './tmdbApi';

const STORAGE_KEY = '@favorites';

export async function getFavorites(): Promise<Movie[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveFavorites(favorites: Movie[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}