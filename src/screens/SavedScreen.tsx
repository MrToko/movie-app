import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieContext";

const SavedScreen = () => {
  const { savedMovies } = useMovieContext();

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      {savedMovies.length === 0 ? (
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
          data={savedMovies}
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
