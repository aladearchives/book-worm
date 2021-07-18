import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, ActivityIndicator} from 'react-native';
import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";
import firebase from "firebase/app";
import 'firebase/auth';


export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSignUp = async () => {
        if (email !== '' && password !== '') {
            setIsLoading(true);
            try {
                const response = await firebase.auth()
                    .createUserWithEmailAndPassword(email, password);
                if (response) {
                    setIsLoading(false);
                    onSignIn(email, password)
                }
            } catch (error) {
                setIsLoading(false)
                if (error.code === 'auth/email-alredy-in-use') {
                    alert('User already exists. Try logging in again')
                }
            }
        } else {
            alert('Please enter email and password');
        }
    }

    const onSignIn = async () => {
        if (email !== '' && password !== '') {
            setIsLoading(true);
            try {
                const response = await firebase.auth()
                    .signInWithEmailAndPassword(email, password);

                if (response) {
                    setIsLoading(false)
                    this.props.navigation.navigate()
                }
            } catch (error) {
                setIsLoading(false)
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('A user with that email does not exist. Sign up first')
                        break;
                    case 'auth/invalid-email':
                        alert('Please enter an email address')
                }
            }
        } else {
            alert('Please enter email and password');
        }
    }


    return (
        <View style={styles.container}>
            {isLoading ?
                <View style={[StyleSheet.absoluteFill, {
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    elevation: 1000
                }]}>
                    <ActivityIndicator size='large' color={colors.logoColor}/>
                </View> : null
            }

            <View style={{flex: 1, justifyContent: "center"}}>

                <TextInput style={styles.textInput}
                           placeholder="abc@example.com"
                           placeHolderTextColor={colors.bgTextInputDark}
                           keyboardType="email-address"
                           onChangeText={newEmail => setEmail(newEmail)}
                />
                <TextInput style={styles.textInput}
                           placeholder="Enter password"
                           placeHolderTextColor={colors.bgTextInputDark}
                           secureTextEntry
                           onChangeText={newPassword => setPassword(newPassword)}
                />
                <View style={{alignItems: "center"}}>
                    <CustomActionButton onPress={onSignIn}
                                        style={[styles.loginButtons, {borderColor: colors.bgPrimary}]}>
                        <Text style={{color: 'white', fontWeight: '100'}}>Login</Text>
                    </CustomActionButton>
                    <CustomActionButton onPress={onSignUp}
                                        style={[styles.loginButtons, {borderColor: colors.bgPrimary}]}>
                        <Text style={{color: 'white', fontWeight: '100'}}>Sign Up</Text>
                    </CustomActionButton>
                </View>
                <View style={{flex: 1}}>

                </View>
            </View>

        </View>
    );
};


const styles = StyleSheet.create(
{
    container: {
        flex: 1,
        backgroundColor: colors.bgMain
    }
,
    textInput: {
        height: 50,
            borderWidth: 0.5,
            borderColor: colors.borderColor,
            marginHorizontal: 40,
            marginBottom: 10,
            color: 'white',
            paddingHorizontal: 10
    }
,
    loginButtons: {
        borderWidth: 0.5,
        backgroundColor:'transparent',
        marginTop: 10,
        width: 200
    }
}
);
