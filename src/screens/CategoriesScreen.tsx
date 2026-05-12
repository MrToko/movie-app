import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";
import CATEGORIES from "../constants/categories";
import { s, vs } from "react-native-size-matters";
import searchMovies, { OmdbSearchItem } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import CustomLoading from "../components/CustomLoading";

const CategoriesScreen = () => {
  const [active, setActive] = useState(CATEGORIES[0]);
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await searchMovies(active.query, 1);
      setMovies(res.Search || []);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [active]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View>
        <ScrollView
          horizontal
          contentContainerStyle={{ padding: s(12), gap: s(8) }}
        >
          {CATEGORIES.map((c) => (
            <Pressable
              onPress={() => setActive(c)}
              key={c.key}
              style={({ pressed }) => [
                styles.categoryItem,
                {
                  backgroundColor:
                    active.key === c.key
                      ? colors.buttonColor
                      : colors.borderColor,
                  opacity: pressed ? 0.75 : 1,
                },
              ]}
            >
              <Text style={styles.categoryText}>{c.label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        {loading ? (
          <CustomLoading />
        ) : error ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item, index) => `${item.imdbID}-${index}`}
            numColumns={2}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  categoryItem: {
    height: vs(30),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingHorizontal: s(14),
    borderRadius: 999,
  },
  categoryText: {
    color: colors.textColor,
    lineHeight: vs(15),
    fontWeight: "700",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});
