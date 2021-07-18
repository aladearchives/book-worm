import React from 'react';
import {View, Text} from 'react-native';

export default function BookCount({title, count}) {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{fontSize: 20}}>{title}</Text>
            <Text>{count}</Text>
        </View>
    )
}
