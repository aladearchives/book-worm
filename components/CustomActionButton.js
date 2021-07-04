import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from "../assets/colors";

export default function CustomActionButton({children, onPress, style}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, style]}>
                {children}
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        backgroundColor: colors.bgError,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
