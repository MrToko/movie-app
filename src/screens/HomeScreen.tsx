import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";
import { s } from "react-native-size-matters";
import { useState } from "react";
import searchMovies, { OmdbSearchItem } from "../api/omdb";
import MovieCard from "../components/MovieCard";

const HomeScreen = () => {
  const [query, setQuery] = useState("Batman");
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);

  const onSubmit = async () => {
    const res = await searchMovies(query);
    const incomingMovies = res.Search || [];
    setMovies(incomingMovies);
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
          placeholder="Search (e.g., batman)"
          placeholderTextColor={colors.inActiveColor}
          returnKeyType="search"
        />
        <Pressable onPress={onSubmit} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(item, index) => `${item.imdbID}-${index}`}
        key={`movies-${movies.length}`}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  searchContainer: {
    padding: s(12),
    flexDirection: "row",
    gap: s(8),
  },
  searchInput: {
    flex: 1,
    borderWidth: s(1),
    borderColor: colors.borderColor,
    color: colors.textColor,
    backgroundColor: colors.backgroundColor,
    borderRadius: s(8),
    paddingHorizontal: s(10),
    fontWeight: 700,
  },
  searchButton: {
    backgroundColor: colors.buttonColor,
    paddingHorizontal: s(16),
    borderRadius: s(8),
    justifyContent: "center",
  },
  searchButtonText: {
    color: colors.textColor,
    fontWeight: 700,
  },
});
