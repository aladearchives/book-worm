import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";
import 'firebase/auth';
import firebase from "firebase";

export default function SettingsScreen() {

    const signOut = async () => {
        try {
            await firebase.auth().signOut()
            this.props.navigation.navigate('WelcomeScreen')
        } catch (error)
        {
            alert('Unable to sign out right now')
        }
    }
    return (
        <View style={styles.container}>
            <CustomActionButton style={{
                width: 200,
                borderWidth: 0.5,
                backgroundColor: 'transparent',
                borderColor: colors.bgError
            }} title='Log Out' onPress={() => signOut}>
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
