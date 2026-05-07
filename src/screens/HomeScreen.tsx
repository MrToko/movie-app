import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";
import { s, vs } from "react-native-size-matters";
import { useState } from "react";
import searchMovies, { OmdbSearchItem } from "../api/omdb";
import MovieCard from "../components/MovieCard";

const HomeScreen = () => {
  const [query, setQuery] = useState("Batman");
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setLoader(true);
    setError("");

    try {
      const res = await searchMovies(query);
      if (res.Response === "True") {
        const incomingMovies = res.Search || [];
        setMovies(incomingMovies);
      } else {
        setMovies([]);
        setError(res.Error || "No movies found");
      }
    } catch {
      setError("something went wrong while fetching movies");
      setMovies([]);
    }

    setLoader(false);
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
          onSubmitEditing={onSubmit} // burada input'ta klavyede arama tuşuna basıldığında da arama yapılmasını sağlıyoruz
        />
        <Pressable onPress={onSubmit} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      {loader ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} />
          <Text
            style={{
              color: colors.textColor,
              marginTop: vs(4),
              textAlign: "center",
            }}
          >
            Loading movies...
          </Text>
        </View>
      ) : error ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: colors.textColor, fontSize: s(14) }}>
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item, index) => `${item.imdbID}-${index}`}
          key={`movies-${movies.length}`}
          numColumns={2}
        />
      )}
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
