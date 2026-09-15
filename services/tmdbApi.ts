// services/tmdbApi.ts
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

export async function fetchPopularMovies(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo obtener las películas`);
  }

  const data = await response.json();
  return data.results;
}