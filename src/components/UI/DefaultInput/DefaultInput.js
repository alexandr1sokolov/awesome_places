import React from "react";
import { connect } from "react-redux";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = ({style, valid, touched, ...props}) => (
  <TextInput
    placeholderTextColor={props.screenMode.textColor}
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, style, !valid && touched ? styles.invalid : null, {backgroundColor: props.screenMode.background}]}
  />
);

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        marginTop: 8,
        marginBottom: 8,

    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: "red"
    }
});
const mapStateToProps = state => {
  return {
    screenMode: state.screenMode,
  };
};

export default connect(mapStateToProps, null) (defaultInput);
