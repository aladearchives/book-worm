import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';

export default function SignUpScreen() {
    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
