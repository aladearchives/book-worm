import React, {useEffect, useState} from 'react';
import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import {createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator} from "react-navigation";
import SignUpScreen from "./screens/SignUpScreen";
import {Ionicons} from "@expo/vector-icons";
import SettingsScreen from "./screens/SettingsScreen";
import CustomDrawerComponent from "./screens/DrawerNavigator/CustomDrawerComponent";
import {firebaseConfig} from "./config/config";
import firebase from "firebase/app";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/AppSwitchNavigator/LoadingScreen";

export default function App() {

    useEffect(
        () => {
            initializeFirebaseApp()
        }, []
    )

    return (
        <AppContainer />
    );
};

const initializeFirebaseApp = () => {
    firebase.intializeApp(firebaseConfig)
}

const LoginStackNavigator = createStackNavigator({
    WelcomeScreen: {
        screen: WelcomeScreen,
        navigationOptions: {
             header: null,
            headerBackTitle: null
        }
    },
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
        }
    }
}, {
    mode: 'modal',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: colors.bgMain
        }
    }
});

const AppDrawerNavigation = createDrawerNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
            drawerIcon: () => <Ionicons name='ios-home' size={24} />
        }
    },
    SettingsScreen: {
        screen: SettingsScreen,
        navigationOptions: {
            title: 'Settings',
            drawerIcon: () => <Ionicons name='ios-settings' size={24} />
        }
    }
}, {
    contentComponent: CustomDrawerComponent
})

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen,
    LoginStackNavigator,
    AppDrawerNavigation
});

const AppContainer = createAppContainer(AppSwitchNavigator);

