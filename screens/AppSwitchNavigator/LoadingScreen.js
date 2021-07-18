import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";
import firebase from "firebase/app";
import 'firebase/auth';

export default function LoadingScreen(props) {

    useEffect(()=> {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // navigate to home screen
                props.navigation.navigate('HomeScreen', {user})
            } else {
            // navigate to login screen
                props.navigation.navigate('LoginStackNavigator')
            }
        })
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: colors.bgMain}}>
            <ActivityIndicator size='large' color={colors.logoColor}/>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgMain
    }
})
