import React from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const listItem = ({onItemPressed,placeImage, placeName, ...props}) => {
  return (
  <TouchableOpacity onPress={onItemPressed}>
    <View style={[styles.listItem, {backgroundColor: props.screenMode.background}]}>
      <Image resizeMode="cover" source={placeImage} style={styles.placeImage}/>
      <Text style={{color: props.screenMode.textColor}}>{placeName}</Text>
    </View>
  </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",

  },
  placeImage: {
      marginRight: 8,
      height: 30,
      width: 30
  }
});

const mapStateToProps = state => {
  return {
    screenMode: state.screenMode,
  };
};

export default connect(mapStateToProps, null) (listItem);
