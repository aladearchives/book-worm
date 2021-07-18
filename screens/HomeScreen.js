import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import BookCount from "../components/BookCount";
import CustomActionButton from "../components/CustomActionButton";
import colors from "../assets/colors";
import firebase from "firebase/app";
import {snapshotToArray} from "../helpers/firebase-helpers";

export default function HomeScreen() {
    const [isAddNewBookVisible, setIsAddNewBookVisible] = useState(false);
    const [textInputData, setTextInputData] = useState('');
    const [books, setBooks] = useState([]);
    const [booksReading, setBooksReading] = useState([]);
    const [booksRead, setBooksRead] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(async () => {
        const {navigation} = this.props;
        const user = navigation.getParam('user');
        const currentUserData = await firebase.database()
            .ref('users')
            .child(user.uid)
            .once('value')

        const books = await firebase.database()
            .ref('books')
            .child(user.uid)
            .once('value')

        const booksArray = snapshotToArray(books)
        setCurrentUser(currentUserData.val())
        setBooks(booksArray)

        const booksUserReading = booksArray.filter(book => !book.read);
        setBooksReading(booksUserReading)

        const booksUserRead = booksArray.filter(book => book.read);
        setBooksRead(booksUserRead)

    }, [])

    return (
        <View style={{flex: 1}}>
            <SafeAreaView/>
            <View style={{
                borderBottomWidth: 0.5,
                borderBottomColor: colors.borderColor,
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
                            style={{flex: 1, backgroundColor: colors.bgTextInput, paddingLeft: 5}}
                            placeholder='Enter Book Name'
                            placeholderTextColor={colors.txtPlaceholder}
                        />

                        <CustomActionButton style={{backgroundColor: colors.bgSuccess}} onPress={
                            async () => {
                                try {
                                    const snapshot = await firebase.database()
                                        .ref('books')
                                        .child(currentUser.uid)
                                        .orderByChild('name')
                                        .equalTo(textInputData).once('value');

                                    if (snapshot.exists()) {
                                        alert('This book already exists')
                                    } else {
                                        const key = firebase.database()
                                            .ref('books')
                                            .child(currentUser.uid)
                                            .push()
                                            .key;

                                        const response = await firebase.database()
                                            .ref('books')
                                            .child(key).set({name: textInputData, read: false});

                                        setBooks((books) => [...books, {name: textInputData, read: false}]);
                                        setBooksReading((books) => [...books, {name: textInputData, read: false}])
                                        setIsAddNewBookVisible(false);
                                    }
                                } catch (error){
                                    console.log(error)
                                }

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
                                <Text>{item.name}</Text>
                            </View>
                            {item.read? (
                                <Ionicons name="ios-checkmark" color={colors.logoColor} size={30} />
                                ) : (
                            <CustomActionButton style={{backgroundColor: colors.bgSuccess, width: 100}}
                                                onPress={({selectedBook, index}) => {
                                                    const newList = []
                                                    books.forEach((book) => {
                                                        if (book.name === selectedBook.name) {
                                                            return newList.push({...book, read: true})
                                                        } else {
                                                            return newList.push(book);
                                                        }
                                                        // if (books.indexOf(book) !== index) {
                                                        //     newList.push(book);
                                                        // }
                                                    })

                                                    const booksForReading = []
                                                    booksReading.forEach((book) => {
                                                        if (book.name !== selectedBook.name){
                                                        // if (booksReading.indexOf(book) !== index) {
                                                            booksForReading.push(book);
                                                        }
                                                    })

                                                    setBooks(newList);
                                                    setBooksReading(booksForReading);
                                                    setBooksRead([...booksRead, {name: selectedBook, read: true}]);
                                                }
                                                }>
                                <Text style={{fontWeight: 'bold', color: 'white'}}
                                >Mark as read</Text>
                            </CustomActionButton>
                            )}

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
                            backgroundColor: colors.bgPrimary,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{color: 'white', fontSize: 30}}>+</Text>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{
                borderTopWidth: 0.5,
                borderTopColor: colors.borderColor,
                height: 70,
                flexDirection: 'row'
            }}>
                <BookCount title='Total Books' count={books.length}/>
                <BookCount title='Reading' count={booksReading.length}/>
                <BookCount title='Read' count={booksRead.length}/>
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
