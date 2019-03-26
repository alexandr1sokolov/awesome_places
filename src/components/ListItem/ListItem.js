import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const listItem = ({onItemPressed,placeImage, placeName, style}) => (
  <TouchableOpacity onPress={onItemPressed}>
    <View style={[styles.listItem,{backgroundColor: style.background}]}>
      <Image resizeMode="cover" source={placeImage} style={styles.placeImage} />
      <Text style={{color: style.textColor}}>{placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",

  },
  placeImage: {
      marginRight: 8,
      height: 30,
      width: 30
  }
});

export default listItem;
