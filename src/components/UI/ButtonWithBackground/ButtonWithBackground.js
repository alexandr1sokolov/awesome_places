import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform} from 'react-native';

const buttonWithBackground = ({color, disabled, children, onPress}) => {
    const content = (
        <View
            style={[
                styles.button,
                { backgroundColor: color },
                disabled ? styles.disabled : null
            ]}
        >
            <Text style={disabled ? styles.disabledText : null}>
                {children}
            </Text>
        </View>
    );
    if (disabled) {
        return content;
    }
    return (
         Platform.OS === 'android' ? (
                    <TouchableNativeFeedback onPress={onPress}>
                        {content}
                    </TouchableNativeFeedback>
                ) : (
                    <TouchableOpacity onPress={onPress}>
                        {content}
                    </TouchableOpacity>
                )
        )
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black"
    },
    disabled: {
        backgroundColor: "#eee",
        borderColor: "#aaa"
    },
    disabledText: {
        color: "#aaa"
    }
});

export default buttonWithBackground;