import React from 'react';
import {View, Text} from 'react-native';

export default function BookCount(props) {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{fontSize: 20}}>{props.title}</Text>
            <Text>{props.count}</Text>
        </View>
    )
}
