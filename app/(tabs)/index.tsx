import { useFavorites } from "@/context/FavoritesContext";
import { fetchPopularMovies, Movie } from "@/services/tmdbApi";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
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
        <View style={styles.movieCard}>
          {item.poster_path && (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
              }}
              style={styles.poster}
            />
          )}
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>⭐ {item.vote_average.toFixed(1)}</Text>
            <Pressable
              onPress={() =>
                isFavorite(item.id)
                  ? removeFavorite(item.id)
                  : addFavorite(item)
              }
            >
              <Text>
                {isFavorite(item.id)
                  ? "❤️ Quitar de favoritos"
                  : "🤍 Agregar a favoritos"}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  movieCard: { flexDirection: "row", padding: 10, gap: 10 },
  poster: { width: 80, height: 120, borderRadius: 8 },
  info: { flex: 1, justifyContent: "center" },
  title: { fontWeight: "bold", fontSize: 16 },
});
