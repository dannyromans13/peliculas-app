// components/MovieCard.tsx
import { Movie } from "@/services/tmdbApi";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  return (
    <View style={styles.movieCard}>
      {movie.poster_path && (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
          }}
          style={styles.poster}
        />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>⭐ {movie.vote_average.toFixed(1)}</Text>
        <Pressable onPress={onToggleFavorite}>
          <Text>
            {isFavorite ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  movieCard: { flexDirection: "row", padding: 10, gap: 10 },
  poster: { width: 80, height: 120, borderRadius: 8 },
  info: { flex: 1, justifyContent: "center" },
  title: { fontWeight: "bold", fontSize: 16 },
});
