import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { getMovieDetails } from "../api/services/movie.service";
import { OmdbDetail } from "../models/movie.model";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";
import { s, vs } from "react-native-size-matters";
import MovieInfo from "../components/MovieInfo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MovieInfoRow from "../components/MovieInfoRow";
import { useMovieContext } from "../context/MovieContext";

const DetailsScreen = () => {
  const { params } = useRoute<any>();

  const [movie, setMovie] = useState<OmdbDetail | null>(null);

  const { toggleSaveMovie, isMovieSaved } = useMovieContext();

  const fetchMovieDetail = async () => {
    const res = await getMovieDetails(params.movieImdbID);

    setMovie(res);
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [params.movieImdbID]);

  const textCapitilaze = (text?: string) => {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  };

  const saved = movie ? isMovieSaved(movie.imdbID) : false;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView contentContainerStyle={{ padding: s(12) }}>
        <Image style={styles.moviePoster} source={{ uri: movie?.Poster }} />

        <View style={{ marginTop: vs(12), gap: 10 }}>
          <Text style={styles.movieTitle}>{movie?.Title}</Text>

          <View style={styles.movieInfoContainer}>
            <MovieInfo label={movie?.Rated} />
            <MovieInfo label={movie?.Runtime} />
            <MovieInfo label={movie?.Year} />
            <MovieInfo label={textCapitilaze(movie?.Type)} />
          </View>

          <View style={styles.movieRatingContainer}>
            <Ionicons name="star" color={"#fbbf24"} size={s(14)} />

            <Text
              style={[
                styles.movieRatingText,
                { marginLeft: s(6), color: "#fbbf24" },
              ]}
            >
              {movie?.imdbRating}
            </Text>

            <Text
              style={[
                styles.movieRatingText,
                { marginLeft: s(6), color: "#9ca3af" },
              ]}
            >
              ({movie?.imdbVotes})
            </Text>
          </View>

          <Text style={{ color: "#9ca3af" }}>{movie?.Genre}</Text>
        </View>

        <View style={{ marginTop: vs(14) }}>
          <Text
            style={{
              color: colors.textColor,
              fontWeight: "800",
              fontSize: s(14),
            }}
          >
            Overview
          </Text>

          <Text
            style={{
              color: "#cbd5e1",
              marginTop: vs(2),
              lineHeight: 18,
            }}
          >
            {movie?.Plot}
          </Text>
        </View>

        <View style={{ marginTop: vs(14) }}>
          <Text
            style={{
              color: colors.textColor,
              fontWeight: "800",
              fontSize: s(14),
            }}
          >
            Info
          </Text>

          <MovieInfoRow label="Director" value={movie?.Director} />

          <MovieInfoRow label="Writer" value={movie?.Writer} />

          <MovieInfoRow label="Actors" value={movie?.Actors} />

          <MovieInfoRow label="Language" value={movie?.Language} />

          <MovieInfoRow label="Country" value={movie?.Country} />

          <MovieInfoRow label="Released" value={movie?.Released} />

          <MovieInfoRow label="IMDb Rating" value={movie?.imdbRating} />

          <MovieInfoRow label="IMDb Votes" value={movie?.imdbVotes} />

          <MovieInfoRow label="Awards" value={movie?.Awards} />
        </View>

        <View style={{ marginTop: vs(14) }}>
          <Text
            style={{
              color: colors.textColor,
              fontWeight: "800",
              fontSize: s(14),
            }}
          >
            Ratings
          </Text>

          {movie?.Ratings ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 12,
                marginTop: vs(8),
              }}
            >
              {movie?.Ratings.map((r, index) => (
                <View
                  key={`${r.Source}-${index}`}
                  style={{
                    width: "48%",
                    backgroundColor: "#172138ff",
                    borderRadius: 12,
                    padding: s(9),
                    borderWidth: 1,
                    borderColor: colors.borderColor,
                  }}
                >
                  <Text
                    style={{
                      color: colors.textColor,
                      fontWeight: "800",
                      fontSize: s(14),
                    }}
                  >
                    {r.Value}
                  </Text>

                  <Text
                    style={{
                      color: "#94a3b8",
                      fontWeight: "800",
                      fontSize: s(12),
                      marginTop: vs(2),
                    }}
                  >
                    {r.Source}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noRatingsText}>No ratings</Text>
          )}
        </View>

        <Pressable
          style={{
            width: "100%",
            backgroundColor: saved ? "green" : "#2563eb",
            padding: s(10),
            marginTop: vs(14),
            borderRadius: 12,
            marginBottom: vs(30),
          }}
          onPress={async () => {
            if (!movie) return;

            await toggleSaveMovie({
              imdbID: movie.imdbID,
              Title: movie.Title,
              Poster: movie.Poster,
              Year: movie.Year,
              Type: movie.Type || "movie",
            });
          }}
        >
          <Text
            style={{
              fontSize: s(14),
              textAlign: "center",
              color: colors.textColor,
              fontWeight: "700",
            }}
          >
            {saved ? "Saved" : "Save"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  moviePoster: {
    width: "100%",
    height: vs(350),
    resizeMode: "cover",
    borderRadius: 12,
  },

  movieTitle: {
    fontSize: s(22),
    color: colors.textColor,
    fontWeight: "800",
  },

  movieInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  movieRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: vs(4),
  },

  movieRatingText: {
    color: "gold",
    fontWeight: "700",
  },

  noRatingsText: {
    textAlign: "left",
    color: "#94a3b8",
    marginTop: vs(5),
    marginBottom: vs(25),
  },
});
