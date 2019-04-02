import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import PlaceInput from "../../components/PlaceInput/PlaceInput";
import NoteInput from "../../components/NoteInput/NoteInput"
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";

import {addPlace, startAddPlace , clearPickedImage} from "../../store/actions/index";

import validate from "../../utility/validation";


class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#29aaf4"
    };

   componentDidMount(){
     this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
   }

  componentWillMount() {
    this.reset();
  }

    reset =()=> this.setState({
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        },
        note:{
          value: "",
          valid: true,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        }
      }
    });

  componentDidUpdate() {
    if (this.props.placeAdded) {
      this.props.navigator.switchToTab({ tabIndex: 0 });
    }
  }

    onNavigatorEvent = event => {
      if (event.type === "ScreenChangedEvent") {
        if (event.id === "willAppear") {
          this.props.onStartAddPlace();
        }
      }
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };

    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    };

  noteChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          note: {
            ...prevState.controls.note,
            value: val,
            valid: validate(val, prevState.controls.note.validationRules),
            touched: true
          }
        }
      };
    });
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  };

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value,
      this.state.controls.note.value
    );
    this.reset();
    this.props.clearPickedImageFunc();
    this.locationPicker.reset();
  };

    render() {
      let submitButton = (
        <Button
          title="Share the Place!"
          onPress={this.placeAddedHandler}
          disabled={
            !this.state.controls.placeName.valid ||
            !this.state.controls.location.valid ||
            !this.state.controls.image.valid
          }
        />
      );

      if (this.props.isLoading) {
        submitButton = <ActivityIndicator />;
      }

      this.props.navigator.setStyle({
        navBarBackgroundColor: this.props.screenMode.background,
        navBarTextColor: this.props.screenMode.textColor,
        screenBackgroundColor: this.props.screenMode.background,
        tabBarBackgroundColor: this.props.screenMode.background
      });

      return (
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <MainText>
              <HeadingText style={{color: this.props.screenMode.textColor}}>Share a Place!</HeadingText>
            </MainText>
            <PickImage onImagePicked={this.imagePickedHandler}/>
            <PickLocation
              onLocationPick={this.locationPickedHandler}
              ref={ref => (this.locationPicker = ref)}
            />
            <NoteInput
              noteData={this.state.controls.note}
              onChangeText={this.noteChangedHandler}
            />
            <PlaceInput
              placeData={this.state.controls.placeName}
              onChangeText={this.placeNameChangedHandler}
            />
            <View style={styles.button}>{submitButton}</View>
          </View>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: "100%"
  },
  scrollView:{
    flex: 1,
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded,
    screenMode: state.screenMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image, note) =>
      dispatch(addPlace(placeName, location, image, note)),
    onStartAddPlace: () => dispatch(startAddPlace()),
    clearPickedImageFunc: () => dispatch(clearPickedImage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);

