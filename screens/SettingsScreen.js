import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <CustomActionButton style={{
                width: 200,
                borderWidth: 0.5,
                backgroundColor: 'transparent',
                borderColor: colors.bgError
            }} title='Log Out' onPress={() => props.navigation.navigate('WelcomeScreen')}>
                <Text style={{fontWeight: '100', color: 'white'}}>Log Out</Text>
            </CustomActionButton>
        </View>
        );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgMain,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
