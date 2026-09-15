import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '@/context/FavoritesContext';

export default function ExploreScreen() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Aún no tienes películas favoritas.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.movieCard}>
          {item.poster_path && (
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
              style={styles.poster}
            />
          )}
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>⭐ {item.vote_average.toFixed(1)}</Text>
            <Pressable onPress={() => removeFavorite(item.id)}>
              <Text>🗑️ Quitar de favoritos</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  movieCard: { flexDirection: 'row', padding: 10, gap: 10 },
  poster: { width: 80, height: 120, borderRadius: 8 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontWeight: 'bold', fontSize: 16 },
});