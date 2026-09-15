import { useFavorites } from "@/context/FavoritesContext";
import { fetchPopularMovies, Movie } from "@/services/tmdbApi";
import { useEffect, useState } from "react";
import { MovieCard } from '@/components/MovieCard';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchPopularMovies();
      setMovies(results);
    } catch (err) {
      setError("No se pudieron cargar las películas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando películas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieCard
          movie={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={() => (isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item))}
        />
)}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
