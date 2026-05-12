import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { OmdbSearchItem } from "../api/omdb";
import { s, vs } from "react-native-size-matters";
import colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

const MovieCard = ({ movie }: { movie: OmdbSearchItem }) => {
  const navigator = useNavigation<any>();

  return (
    <Pressable // Burada onPress ile detay sayfasına gidiyoruz ve imdbID'yi parametre olarak gönderiyoruz
      onPress={
        () => navigator.navigate("DetailsScreen", { movieImdbID: movie.imdbID }) // navigate fonksiyonunu kullanarak "DetailsScreen" adlı ekrana gidiyoruz ve movieImdbID parametresini gönderiyoruz
      }
      style={styles.movieCard}
    >
      <View style={styles.movieCardDetail}>
        <Image source={{ uri: movie.Poster }} style={styles.movieCardImage} />
        <View style={styles.movieTitles}>
          <Text style={styles.movieTitle}>{movie.Title}</Text>
          <Text style={styles.movieYear}>{movie.Year}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieCard: {
    width: "50%",
    padding: s(12),
  },
  movieCardDetail: {
    backgroundColor: colors.movieBackgroundColor,
    borderRadius: s(12),
    overflow: "hidden",
  },
  movieCardImage: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: colors.movieBackgroundColor,
  },
  movieTitles: {
    padding: s(10),
  },
  movieTitle: {
    color: "#fff",
    fontSize: s(12),
    fontWeight: 700,
  },
  movieYear: {
    color: colors.inActiveColor,
    fontSize: s(10),
    marginTop: vs(4),
  },
});
