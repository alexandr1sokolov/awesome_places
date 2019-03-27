import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from "react-native";
import { connect } from "react-redux";

import PlaceList from "../../components/PlaceList/PlaceList";
import { getPlaces } from "../../store/actions/index";

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#29aaf4",
    };


    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    };

   componentDidMount(){
       this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
   }

    onNavigatorEvent = event => {
        event.type === "ScreenChangedEvent" && event.id === "willAppear" && this.props.onLoadPlaces();
        event.type === "NavBarButtonPress" && event.id === "sideDrawerToggle" && this.props.navigator.toggleDrawer({ side: "left"});
    };

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            });
            this.placesLoadedHandler();
        });
    };

    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => place.key === key);

        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    };

    render() {
      this.props.navigator.setStyle({
        navBarBackgroundColor: this.props.screenMode.background,
        navBarTextColor: this.props.screenMode.textColor,
        screenBackgroundColor: this.props.screenMode.background,
        tabBarBackgroundColor: this.props.screenMode.background
      });
      const settings = {
        scale: this.state.removeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 1]
        })
      };
        let content = (
            <Animated.View style={{ opacity: this.state.removeAnim, transform: [ settings ] }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
        if (this.state.placesLoaded) {
            content = (
                <Animated.View style={{ opacity: this.state.placesAnim }}>
                    <PlaceList
                        places={this.props.places}
                        onItemSelected={this.itemSelectedHandler}
                    />
                </Animated.View>
            );
        }
        console.log("props",this.props.screenMode.background);
        return (
            <View style={[this.state.placesLoaded ? null : styles.buttonContainer,{backgroundColor: this.props.screenMode.background}]}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    searchButton: {
        borderColor: "#29aaf4",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "#29aaf4",
        fontWeight: "bold",
        fontSize: 26
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places,
        screenMode: state.screenMode,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);


