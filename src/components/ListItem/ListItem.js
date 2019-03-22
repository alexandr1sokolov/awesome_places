import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const listItem = ({onItemPressed,placeImage, placeName}) => (
  <TouchableOpacity onPress={onItemPressed}>
    <View style={styles.listItem}>
      <Image resizeMode="cover" source={placeImage} style={styles.placeImage} />
      <Text>{placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  placeImage: {
      marginRight: 8,
      height: 30,
      width: 30
  }
});

export default listItem;
