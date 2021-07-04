import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import BookCount from "./components/BookCount";
import CustomActionButton from "./components/CustomActionButton";

export default function App() {
    let [totalCount, setTotalCount] = useState(0);
    const [readingCount, setReadingCount] = useState(0);
    const [readCount, setReadCount] = useState(0);
    const [isAddNewBookVisible, setIsAddNewBookVisible] = useState(false);
    const [textInputData, setTextInputData] = useState('');
    const [books, setBooks] = useState([]);
    const [bookData, setBookData] = useState({
        author: '',
        publisher: ''
    });


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
                            onChangeText={(text) => setTextInputData(text)}
                            style={{flex: 1, backgroundColor: '#ececec', paddingLeft: 5}}
                            placeholder='Enter Book Name'
                            placeholderTextColor='grey'
                        />

                        <CustomActionButton style={{backgroundColor: '#a5deba'}} onPress={
                            () => {
                                setBooks((books) => [...books, textInputData]);
                                setTotalCount((count) => count + 1);
                                setReadingCount((count) => count + 1);
                                setIsAddNewBookVisible(false)
                                setBookData({
                                    ...bookData,
                                    author: 'kkdd'
                                })
                            }
                        }>
                            <Ionicons name='ios-checkmark' color='white' size={40}/>
                        </CustomActionButton>

                        <CustomActionButton onPress={
                            () => setIsAddNewBookVisible(false)
                        }>
                            <Ionicons name='ios-close' color='white' size={40}/>
                        </CustomActionButton>

                    </View>
                )}

                <FlatList
                    data={books}
                    renderItem={({item}) =>
                        <View style={{height: 50, flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', paddingLeft: 5}}>
                                <Text>{item}</Text>
                            </View>
                            <CustomActionButton style={{backgroundColor: '#a5deba', width: 100}}
                                                onPress={({item, index}) => {
                                                    const newList = []
                                                    books.forEach((book) => {
                                                        if (books.indexOf(book) !== index) {
                                                            newList.push(book);
                                                        }
                                                    })

                                                    setBooks(newList);
                                                    setReadingCount((readingCount) => readingCount - 1);
                                                    setReadCount((readCount) => readCount + 1);
                                                }
                                                }>
                                <Text style={{fontWeight: 'bold', color: 'white'}}
                                >Mark as read</Text>
                            </CustomActionButton>

                        </View>

                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={
                        <View style={{marginTop: 50, alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold'}}>Not Reading Any Book</Text>
                        </View>
                    }
                />
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
