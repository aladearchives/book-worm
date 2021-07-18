import React, {useState} from 'react';
import {Text, View, Platform, SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import colors from "../../assets/colors";
import {DrawerItems} from "react-navigation";
  import {ScrollView} from "react-native-gesture-handler";

export default function CustomDrawerComponent(props) {

    return (
        <ScrollView>
            <SafeAreaView style={{backgroundColor: colors.bgMain}} />
            <View style={{height: 150, backgroundColor: colors.bgMain,
                alignItems: 'center', justifyContent: 'center', paddingTop: Platform.OS == 'android'? 20: 0}}>
                <Ionicons name='ios-bookmarks' size={100} color={colors.logoColor} />
                <Text style={{fontSize: 24, color: 'white', fontWeight: 100}}>
                    BookWorm
                </Text>
            </View>
            <DrawerItems {...props}/>
        </ScrollView>
    )
}
