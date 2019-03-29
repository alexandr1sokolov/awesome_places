import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";



class PickImage extends Component {
  state = {
    pickedImage: null
  };

  reset = () => {
    this.setState({
      pickedImage: null
    });
  };

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image",maxWidth:1920, maxHeight:1080}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.props.onImagePicked({uri: res.uri, base64: res.data});
      }
    });
    this.reset()
  };

  render() {
    console.log("img",this.props);
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={[styles.previewImage,{backgroundColor: this.props.screenMode.background}]} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "80%",
      height: 150
    },
    button: {
      margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%",
    }
  });

const mapStateToProps = state => {
  return {
    screenMode: state.screenMode,
  };
};

export default connect(mapStateToProps, null)(PickImage);
