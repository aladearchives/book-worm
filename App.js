import React, {useState} from 'react';
import WelcomeScreen from "./screens/AppSwitchNavigator/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import {createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator} from "react-navigation";
import SignUpScreen from "./screens/SignUpScreen";
import {Ionicons} from "@expo/vector-icons";
import SettingsScreen from "./screens/SettingsScreen";
import CustomDrawerComponent from "./screens/DrawerNavigator/CustomDrawerComponent";

export default function App() {
    return (
        <AppContainer />
    );
};

const LoginStackNavigator = createStackNavigator({
    WelcomeScreen: {
        screen: WelcomeScreen,
        navigationOptions: {
             header: null,
            headerBackTitle: null
        }
    },
    SignUpScreen: {
        screen: SignUpScreen,
        navigationOptions: {
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
    LoginStackNavigator,
    AppDrawerNavigation
});

const AppContainer = createAppContainer(AppSwitchNavigator);

