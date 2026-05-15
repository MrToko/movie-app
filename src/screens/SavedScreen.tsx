import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllSaved, SavedMovie } from "../storage/saved";
import { s } from "react-native-size-matters";
import MovieCard from "../components/MovieCard";
import { useIsFocused } from "@react-navigation/native";
import { OmdbSearchItem } from "../api/omdb";

const SavedScreen = () => {
  // Kaydedilen filmlerin listelendiği ekran. AsyncStorage'dan kaydedilen filmleri çekip ekranda gösterir. Eğer kaydedilen film yoksa kullanıcıya bir mesaj gösterir.
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]); // Kaydedilen filmleri tutan state. AsyncStorage'dan çekilen filmler burada tutulur ve ekranda gösterilir.
  const isFocus = useIsFocused(); // Ekranın odaklanıp odaklanmadığını kontrol eden hook. Kullanıcı bu ekrana geri döndüğünde kaydedilen filmleri tekrar çekmek için kullanılır.

  const getAllMovies = async () => {
    // AsyncStorage'dan tüm kaydedilen filmleri çeken fonksiyon. getAllSaved fonksiyonunu kullanarak kaydedilen filmleri çeker ve state'e atar. Eğer bir hata olursa boş bir liste atanır.
    const all = await getAllSaved();
    setMovies(Object.values(all));
  };

  useEffect(() => {
    getAllMovies();
  }, [isFocus]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {movies.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: s(20),
          }}
        >
          <Text>No saved movies yet</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          numColumns={2}
          keyExtractor={(mov) => mov.imdbID}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});
