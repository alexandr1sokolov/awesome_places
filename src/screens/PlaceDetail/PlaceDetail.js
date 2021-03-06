import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView

} from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";

class PlaceDetail extends Component {
  state = {
    viewMode: "portrait"
  };

  componentDidMount() {
    Dimensions.addEventListener("change", this.updateStyles)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };


  render() {
    this.props.navigator.setStyle({
      navBarBackgroundColor: this.props.screenMode.background,
      navBarTextColor: this.props.screenMode.textColor,
      screenBackgroundColor: this.props.screenMode.background,
      tabBarBackgroundColor: this.props.screenMode.background
    });
    return (
      <ScrollView>
      <View style={[ styles.container, this.state.viewMode === "portrait" ? styles.portraitContainer : styles.landscapeContainer ]}>
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  Dimensions.get("window").width /
                  Dimensions.get("window").height *
                  0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
            <Image
              source={this.props.selectedPlace.image}
              style={styles.placeImage}
            />
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={[styles.placeName, {color: this.props.screenMode.textColor}]}>
              {this.props.selectedPlace.name}
            </Text>
          </View>
          {
            this.props.selectedPlace.note &&
            <View>
              <Text style={[styles.placeNote, {color: this.props.screenMode.textColor}]}>
                {this.props.selectedPlace.note}
              </Text>
            </View>
          }
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column",

  },
  landscapeContainer: {
    flexDirection: "row"
  },
  placeDetailContainer: {
    flex: 1,
  },
  placeImage: {
    flex:1,
    height: 200,
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  placeNote: {
    textAlign: "center",
    fontSize: 26
  },
  map: {
    flex:1,
    height: 200,

  },
  deleteButton: {
    alignItems: "center"
  },
  subContainer: {
    flex: 1,
  }
});

const mapStateToProps = state => {
  return {
    screenMode: state.screenMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);