import { MovieCard } from "@/components/MovieCard";
import { useFavorites } from "@/context/FavoritesContext";
import { FlatList, StyleSheet, Text, View } from "react-native";

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
        <MovieCard
          movie={item}
          isFavorite={true}
          onToggleFavorite={() => removeFavorite(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
