import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import BookCount from "./components/BookCount";

export default function App() {
    const [totalCount, setTotalCount] = useState(0);
    const [readingCount, setReadingCount] = useState(0);
    const [readCount, setReadCount] = useState(0);
    const [isAddNewBookVisible, setIsAddNewBookVisible] = useState(false);
    return (
        <View style={{flex: 1}}>
            <SafeAreaView/>
            <View style={{
                borderBottomWidth: 0.5,
                borderBottomColor: '#E9E9E9',
                height: 70,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{fontSize: 24}}>Book Worm</Text>
            </View>
            <View style={[{flex: 1}]}>
                {isAddNewBookVisible && (
                <View style={{height: 50, flexDirection: 'row'}}>
                    <TextInput
                        style={{flex: 1, backgroundColor: '#ececec', paddingLeft: 5}}
                        placeholder='Enter Book Name'
                        placeholderTextColor='grey'
                    />
                    <TouchableOpacity>
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                backgroundColor: '#a5deba',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Ionicons name='ios-checkmark' color='white' size={40}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                backgroundColor: '#deada5',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Ionicons name='ios-close' color='white' size={40}/>
                        </View>
                    </TouchableOpacity>
                </View>
                )}
                <TouchableOpacity
                    onPress={() => setIsAddNewBookVisible(true)}
                    style={{position: 'absolute', bottom: 20, right: 20}}>
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: '#AAD1E6',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{color: 'white', fontSize: 30}}>+</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{
                borderTopWidth: 0.5,
                borderTopColor: '#E9E9E9',
                height: 70,
                flexDirection: 'row'
            }}>
                <BookCount title='Total' count={totalCount}/>
                <BookCount title='Reading' count={readingCount}/>
                <BookCount title='Read' count={readCount}/>
            </View>
            <SafeAreaView/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: 50,
        width: 50,
        backgroundColor: 'red'
    }
});
