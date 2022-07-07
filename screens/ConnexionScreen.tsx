import React, {useEffect, useState} from "react";
import { StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {auth} from '../firebase';
import firebase from '../firebase';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Text, View, } from '../components/Themed';
import {RootStackScreenProps} from "../types";
import { useFocusEffect } from "@react-navigation/native";

export default function ConnexionScreen({navigation} : RootStackScreenProps<'Root'>) {
    
    const [email, setEmail] = useState('')
    const [motDePasse, setmotDePasse] = useState('')

    useEffect(() =>{
        const unsuscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Root")
            }
        })
        return unsuscribe
    }, [])
 
    const handleLogIn = () => {
     auth 
         .signInWithEmailAndPassword(
                email,
                motDePasse)
         .then(() => {;
             const user = firebase.default.auth().currentUser;
             console.log(' OKkk Logged in with:', user.email);
         } )
         .catch(error => alert(error.message))
    }
     
    

    return (
        <View style={styles.container}>

            <View style = {{backgroundColor: "#209209", height: "40%",}}>
            </View>

            <Text style = {styles.bigtitle}> GrünMeal </Text>

            <View style = {{ width: "100%", alignItems: 'center'}}>
                <View style = {styles.curvedLine}>
                </View>

                <View style = {styles.box}>
                    <Text style = {styles.title}> Connexion </Text>

                    <View style={styles.input}>
                        <FontAwesome name="sign-in" size={24} color="green" style={{marginRight: 10,}} />
                        <TextInput
                          //  onChangeText={(text) => handleChange('email', text)}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            placeholder="Adresse e-mail"
                        />
                    </View>

                    <View style={styles.input}>
                        <AntDesign name="lock1" size={24} color="green" style={{marginRight: 10,}}/>
                        <TextInput
                            onChangeText={(text) => setmotDePasse(text)}
                            value={motDePasse}
                            placeholder="Mot de passe"
                        />
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttontext } onPress={handleLogIn}> Connexion </Text>
                    </TouchableOpacity>

                    <Text style={styles.text}> Vous n'avez pas encore de compte ? </Text>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.replace('Inscription')}>
                        <Text style={styles.buttontext} > S'inscrire </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    curvedLine: {
        marginTop : 120,
        height : "70%",
        width: "70%",
        borderRadius: 90,
        transform: [{scaleX: 2}, {scaleY: 2}]
    },
    bigtitle : {
        position: "absolute",
        textAlign: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 48,
        marginTop: 70,
        fontFamily: 'serif',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 50,
        lineHeight: 48,
        color: "white",
    },
    box : {
        alignItems: 'center',
        position : "absolute",
        width: "80%",
        height: 350,
        marginTop: -130,
        borderStyle: 'solid',
        borderColor: 'rgb(190, 190, 190)',
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: "#FAFAFA",
    },
    title : {
        textAlign: 'center',
        justifyContent: 'center',
        width: 213,
        height: 48,
        top: 40,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 35,
        lineHeight: 48,
        color: "#868585",
    },

    input: {
        height: 50,
        margin: 12,
        top : 70,
        borderWidth: 1,
        borderColor: "rgb(190, 190, 190)",
        padding: 10,
        paddingEnd: 50,
        width: "90%",
        flexDirection: 'row',
        borderRadius: 10,
    },

    button : {
        backgroundColor: "#209209",
        padding: 10,
        top: 90,
        borderRadius: 100,
        width:"60%",
    },
    buttontext : {
        color:"white",
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: "center",
    },

    text : {
        top: 170,
        color: "#CDCCCC",
    },
    button2 : {
        backgroundColor: "#209209",
        padding: 10,
        top: 180,
        borderRadius: 100,
        width:"60%",
    },
});