import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";

export default function WelcomeScreen(props) {

    return (
        <View style={{flex: 1, backgroundColor: colors.bgMain}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name="ios-bookmarks" size={150} color={colors.logoColor}/>
                <Text style={{fontSize: 50, fontWeight: '100', color: 'white'}}>Book Worm</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <CustomActionButton style={{
                    width: 200,
                    borderWidth: 0.5,
                    backgroundColor: 'transparent',
                    borderColor: colors.bgPrimary,
                    marginBottom: 10
                }} title='Log In' onPress={() => props.navigation.navigate('HomeScreen')}>
                    <Text style={{fontWeight: '100', color: 'white'}}>Login</Text>
                </CustomActionButton>

                <CustomActionButton style={{
                    width: 200,
                    borderWidth: 0.5,
                    backgroundColor: 'transparent',
                    borderColor: colors.bgError
                }} title='Sign up' onPress={() => props.navigation.navigate('SignUpScreen')}>
                    <Text style={{fontWeight: '100', color: 'white'}}>Sign Up</Text>
                </CustomActionButton>
            </View>
        </View>)
}
