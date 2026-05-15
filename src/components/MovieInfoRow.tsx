import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { s, vs } from "react-native-size-matters";

const MovieInfoRow = ({ label, value }: { label: string; value?: string }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: vs(6) }}>
      <Text style={{ color: "#94a3b8", width: s(80) }}>{label}</Text>
      <Text style={{ color: "#cbd5e1", flex: 1 }}>{value || ""}</Text>
    </View>
  );
};

export default MovieInfoRow;

const styles = StyleSheet.create({});
