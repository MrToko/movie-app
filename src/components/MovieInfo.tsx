import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../theme/colors";
import { s, vs } from "react-native-size-matters";

const MovieInfo = ({ label }: { label?: string }) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{label || ""}</Text>
    </View>
  );
};

export default MovieInfo;

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: colors.movieBackgroundColor,
    borderRadius: 12,
    paddingHorizontal: s(12),
    paddingVertical: vs(6),
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  labelText: {
    fontWeight: "700",
    color: colors.textColor,
  },
});
