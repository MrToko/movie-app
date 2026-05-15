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
import { OmdbSearchItem } from "../models/movie.model";
import { searchMovies } from "../api/services/movie.service";
import MovieCard from "../components/MovieCard";
import CustomLoading from "../components/CustomLoading";

const CategoriesScreen = () => {
  const [active, setActive] = useState(CATEGORIES[0]);
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchMovies = async (pageNum: number, isNewCategory = false) => {
    if (isNewCategory) setLoading(true);

    setError("");

    try {
      const res = await searchMovies(active.query, pageNum);

      if (res.Response === "True") {
        const incomingMovies = res.Search || [];

        setHasMore(incomingMovies.length === 10);

        setMovies((prev) => {
          if (pageNum === 1) return incomingMovies;

          const uniqueMovies = incomingMovies.filter(
            (movie: OmdbSearchItem) =>
              !prev.some((prevMovie) => prevMovie.imdbID === movie.imdbID),
          );

          return [...prev, ...uniqueMovies];
        });
      } else {
        if (pageNum === 1) {
          setMovies([]);
          setError(res.Error || "No movies found");
        }

        setHasMore(false);
      }
    } catch {
      if (pageNum === 1) {
        setMovies([]);
        setError("Something went wrong");
      }
    } finally {
      if (isNewCategory) setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore || loading || loadingMore) return;

    setLoadingMore(true);

    const nextPage = page + 1;

    try {
      await fetchMovies(nextPage);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);

    fetchMovies(1, true);
  }, [active]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: s(12),
            gap: s(8),
          }}
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
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(item, index) => `${item.imdbID}-${index}`}
            numColumns={2}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator color={colors.activeColor} />
              ) : hasMore ? (
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.textColor,
                    marginTop: vs(6),
                    marginBottom: vs(15),
                  }}
                >
                  Keep scrolling for more
                </Text>
              ) : movies.length > 0 ? (
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.textColor,
                    marginTop: vs(6),
                    marginBottom: vs(15),
                  }}
                >
                  You've seen all movies
                </Text>
              ) : null
            }
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
