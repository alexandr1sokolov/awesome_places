import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
  Switch
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";

import { authLogout, nightModeToggle } from "../../store/actions/index";

class SideDrawer extends Component {
    render() {
        return (
          <View
            style={[
                styles.container,
                {
                    width: Dimensions.get("window").width * 0.8,
                    backgroundColor: this.props.screenMode.background
                }
            ]}
          >
              <TouchableOpacity onPress={this.props.onLogout}>
                  <View style={[styles.drawerItem, {backgroundColor: this.props.screenMode.background}]}>
                      <Icon
                        name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                        size={30}
                        color="#aaa"
                        style={styles.drawerItemIcon}
                      />
                      <Text style={{color: this.props.screenMode.textColor}}>Sign Out</Text>
                  </View>
              </TouchableOpacity>
              <View style={[styles.drawerItem, styles.switch]}>
                  <Text style={{color: this.props.screenMode.textColor}}>Night Mode</Text>
                  <Switch onValueChange={this.props.nightModeToggleFunc}
                          value={this.props.screenMode.background === "#1c1c1c"}
                  />
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginBottom:5
    },
    drawerItemIcon: {
        marginRight: 10
    },
    switch: {
        justifyContent: 'space-between'
    }
});

const mapStateToProps = state => {
    return {
        screenMode: state.screenMode,
    };
};

const mapDispatchToProps = dispatch => {


    return {
        onLogout: () => dispatch(authLogout()),
        nightModeToggleFunc:(e)=>dispatch(nightModeToggle())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
