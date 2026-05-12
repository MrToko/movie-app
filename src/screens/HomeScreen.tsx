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
import { OmdbSearchItem, searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";
import CustomLoading from "../components/CustomLoading";

const CategoriesScreen = () => {
  // active category state'i, filmler, loading ve error state'leri tanımlanır Burada ayrıca sayfalama için page, hasMore ve loadingMore state'leri de tanımlanır
  const [active, setActive] = useState(CATEGORIES[0]); // default olarak ilk kategori aktif olur
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]); // filmler burada tutulur
  const [loading, setLoading] = useState(false); // veri çekilirken loading göstermek için
  const [error, setError] = useState(""); // hata mesajı burada tutulur

  const [page, setPage] = useState(1); // hangi sayfanın yüklendiğini tutar
  const [hasMore, setHasMore] = useState(true); // daha fazla sayfa olup olmadığını tutar
  const [loadingMore, setLoadingMore] = useState(false); // daha fazla sayfa yüklenirken loading göstermek için

  const fetchMovies = async (pageNum: number, isNewCategory = false) => {
    // yeni kategori seçildiğinde loading göstermek için isNewCategory parametresi eklenir
    if (isNewCategory) setLoading(true);

    setError("");

    try {
      // OMDb API'sinden filmleri çekmek için searchMovies fonksiyonu çağrılır, burada aktif kategorinin query'si ve sayfa numarası parametre olarak verilir
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
    // sayfanın sonuna gelindiğinde daha fazla film yüklemek için çağrılır
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
    // aktif kategori değiştiğinde filmleri yeniden çekmek için useEffect kullanılır
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
          {CATEGORIES.map(
            (
              c, // kategoriler arasında geçiş yapmak için butonlar oluşturulur
            ) => (
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
            ),
          )}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        {loading ? ( // filmler yüklenirken loading göstermek için conditional rendering yapılır
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
          <FlatList // filmleri listelemek için FlatList kullanılır
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
